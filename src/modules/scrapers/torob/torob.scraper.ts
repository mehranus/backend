import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import {
  TorobSearchItem,
  TorobSearchResponse,
} from './torob.types';

import { ProductInterface } from '@/modules/products/product.interface';
import { ScraperInterface } from '../scrapers.interface';

/*
 * مسیر را مطابق ساختار پروژه خودت تنظیم کن.
 *
 * مثال‌ها:
 * import { filterAndSortProducts } from '../utils/product-search.util';
 * import { filterAndSortProducts } from '@/common/utils/product-search.util';
 */
import { filterAndSortProducts } from '@/utils/product-search.util';

@Injectable()
export class TorobScraper implements ScraperInterface {
  private readonly logger = new Logger(TorobScraper.name);

  private readonly baseUrl = 'https://api.torob.com';
  private readonly torobWebUrl = 'https://torob.com';

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async search(query: string): Promise<ProductInterface[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return [];
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<TorobSearchResponse>(
          `${this.baseUrl}/v4/base-product/search/`,
          {
            params: {
              page: 0,
              size: 24,
              sort: 'popularity',
              query: normalizedQuery,

              // پارامترهای مشابه درخواست مرورگر ترب
              q: normalizedQuery,
              _search_landing: 'home',
              _landing_page: 'home',
              source: 'next_desktop',
            },
            headers: {
              Accept: 'application/json, text/plain, */*',
              Origin: this.torobWebUrl,
              Referer: `${this.torobWebUrl}/`,
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
            },
            timeout: 15_000,
          },
        ),
      );

      const results = Array.isArray(data?.results)
        ? data.results
        : [];

      // تبدیل پاسخ خام Torob به مدل داخلی پروژه
      const products = results
        .filter((item) => Boolean(item?.random_key))
        .map((item) => this.mapProduct(item));

      /*
       * این بخش از Utility استفاده می‌کند.
       *
       * وظایف Utility می‌تواند شامل این موارد باشد:
       * - حذف محصولات تکراری
       * - حذف کالاهای طرح / های‌کپی
       * - بررسی تطابق مدل و حافظه با عبارت جستجو
       * - مرتب‌سازی براساس نو/استوک و قیمت
       * - محدود کردن خروجی به مثلاً 10 کالا
       */
      const filteredProducts = filterAndSortProducts(
        products,
        normalizedQuery,
      );

      this.logger.log(
        `Torob search completed. query="${normalizedQuery}", rawResults=${results.length}, mappedProducts=${products.length}, filteredResults=${filteredProducts.length}`,
      );

      return filteredProducts;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown Torob API error';

      this.logger.error(
        `Torob search failed. query="${normalizedQuery}", error=${message}`,
      );

      return [];
    }
  }
private normalizePrice(rawPrice: unknown, unit: 'IRR' | 'IRT' = 'IRT'): number {
  const price = Number(rawPrice);

  if (!Number.isFinite(price) || price <= 0) {
    return 0;
  }

  // IRR = ریال، IRT = تومان
  return unit === 'IRR' ? Math.round(price / 10) : Math.round(price);
}
  private mapProduct(item: TorobSearchItem): ProductInterface {
    const productPath =
      item.web_client_absolute_url || `/p/${item.random_key}`;

    const productUrl = productPath.startsWith('http')
      ? productPath
      : `${this.torobWebUrl}${productPath}`;

      
    const price =
      typeof item.price === 'number' && item.price > 0
        ? item.price
        : 0;
        const rawPrice =
  typeof item.price === 'number' && item.price > 0
    ? item.price
    : 0;

/*
 * Torob price در پاسخ API به ریال است.
 *
 * مثال:
 * 270000000 ریال => 27000000 تومان
 */
const priceInToman = rawPrice > 0
  ? Math.floor(rawPrice / 10)
  : 0;
  

    return {
      id: item.random_key,

      title: item.name1 || item.name2 || 'Unknown Product',

      url: productUrl,

      image:
        item.image_url ||
        item.media_urls?.[0]?.url ||
        undefined,

      price:this.normalizePrice(rawPrice,'IRT'),

      /*
       * اگر عدد price در پاسخ API ترب بر حسب تومان است، IRT درست است.
       * اگر در لاگ/پاسخ دیدی مثلاً 63,490,000 برای کالای 6,349,000 تومانی،
       * یعنی قیمت ریال است و باید این را IRR قرار دهی یا هنگام نمایش تقسیم بر 10 کنی.
       */
      currency: 'IRT',

      store: {
        name: item.shop_text || 'Torob',
        url: this.torobWebUrl,
      },

      availability: price > 0,

      scrapedAt: new Date(),
    };
  }
}