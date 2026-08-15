import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  TorobSearchItem,
  TorobSearchResponse,
} from './torob.types';

import { ProductInterface } from '@/modules/products/product.interface';
import { ScraperInterface } from '../scrapers.interface';
import * as cheerio  from "cheerio"


@Injectable()
export class TorobScraper implements ScraperInterface {
  constructor(
    private readonly httpService: HttpService,
  ) {}

 async search(query: string): Promise<ProductInterface[]> {
  const response = await firstValueFrom(
    this.httpService.get<string>('https://torob.com/search/', {
      params: {
        q: query,
      },
    }),
  );

  const $ = cheerio.load(response.data);

  console.log('TITLE:', $('title').text());
  console.log('LINKS:', $('a').length);
  console.log('TEXT:', $('body').text().slice(0, 2000));

  return [];
}

 private mapProduct(item: TorobSearchItem): ProductInterface {
    return {
      id: item.random_key,
      title: item.name1 ?? item.name2 ?? 'Unknown Product',
      url: `https://torob.com/p/${item.random_key}`,
      image: item.image_url,
      price: item.price ?? 0,
      currency: 'IRT',
      store: {
        name: 'Torob',
        url: 'https://torob.com',
      },
      availability: true,
      scrapedAt: new Date(),
    };
  }
}