import { ProductInterface } from '@/modules/products/product.interface';

export function filterAndSortProducts(
  products: ProductInterface[],
  query: string,
): ProductInterface[] {
  const normalizedQuery = normalizeText(query);

  const requestedModel = extractPhoneModel(normalizedQuery);
  const requestedStorage = extractStorage(normalizedQuery);
  const userWantsStock = hasAnyKeyword(normalizedQuery, [
    'استوک',
    'کارکرده',
    'دست دوم',
    'دست‌دوم',
    'used',
    'refurbished',
  ]);

  const uniqueProducts = new Map<string, ProductInterface>();

  for (const product of products) {
    if (!isValidProduct(product)) {
      continue;
    }

    const normalizedTitle = normalizeText(product.title);

    /*
     * اگر کاربر کالای استوک نخواسته باشد،
     * تمام محصولات استوک / کارکرده حذف می‌شوند.
     */
    if (!userWantsStock && isStockProduct(normalizedTitle)) {
      continue;
    }

    /*
     * تطابق دقیق مدل:
     *
     * query: s26
     * allowed: S26
     * rejected: S26 Plus, S26 Ultra
     *
     * query: s26 plus
     * allowed: S26 Plus
     */
    if (
      requestedModel &&
      !doesProductMatchRequestedModel(normalizedTitle, requestedModel)
    ) {
      continue;
    }

    /*
     * اگر کاربر حافظه مشخص کرده باشد، مثل 256GB،
     * محصول باید همان حافظه را داشته باشد.
     */
    if (
      requestedStorage &&
      !doesProductMatchStorage(normalizedTitle, requestedStorage)
    ) {
      continue;
    }

    /*
     * یک محصول ممکن است از چند فروشگاه یا با عنوان کمی متفاوت
     * بازگردد. فعلاً بر اساس شناسه حذف تکراری انجام می‌دهیم.
     */
    if (!uniqueProducts.has(product.id)) {
      uniqueProducts.set(product.id, product);
    }
  }

  return [...uniqueProducts.values()]
    .sort((firstProduct, secondProduct) => {
      return firstProduct.price - secondProduct.price;
    })
    .slice(0, 10);
}

function isValidProduct(product: ProductInterface): boolean {
  return Boolean(
    product.id &&
      product.title &&
      product.url &&
      typeof product.price === 'number' &&
      product.price > 0,
  );
}

function doesProductMatchRequestedModel(
  normalizedTitle: string,
  requestedModel: string,
): boolean {
  const titleModel = extractPhoneModel(normalizedTitle);

  /*
   * اگر مدل از عنوان قابل استخراج نبود،
   * برای جلوگیری از نمایش محصول اشتباه، آن را رد می‌کنیم.
   */
  if (!titleModel) {
    return false;
  }

  return titleModel === requestedModel;
}

function doesProductMatchStorage(
  normalizedTitle: string,
  requestedStorage: number,
): boolean {
  const titleStorage = extractStorage(normalizedTitle);

  /*
   * اگر حافظه از عنوان مشخص نباشد، محصول را نگه می‌داریم.
   * دلیل: بعضی فروشنده‌ها ظرفیت را در عنوان درج نمی‌کنند.
   *
   * اگر می‌خواهی سخت‌گیرانه باشد، این بخش را به false تغییر بده:
   *
   * if (!titleStorage) return false;
   */
  if (!titleStorage) {
    return true;
  }

  return titleStorage === requestedStorage;
}

/*
 * نمونه خروجی:
 *
 * samsung s26 256gb       => s26
 * samsung s26 plus 256gb  => s26 plus
 * samsung s26 ultra       => s26 ultra
 * galaxy a25 5g           => a25
 * آیفون 15 پرو مکس         => 15 pro max
 */
function extractPhoneModel(text: string): string | null {
  const normalized = normalizeText(text);

  /*
   * مدل‌های سامسونگ:
   * A25 / A26 / S26 / S26 Plus / S26 Ultra / FE
   */
  const samsungMatch = normalized.match(
    /\b([asmfz]\d{1,3})(?:\s*(ultra|plus|fe|edge))?\b/i,
  );

  if (samsungMatch) {
    const baseModel = samsungMatch[1].toLowerCase();
    const variant = samsungMatch[2]?.toLowerCase();

    return variant ? `${baseModel} ${variant}` : baseModel;
  }

  /*
   * مدل‌های آیفون:
   * iPhone 15 / iPhone 15 Pro / iPhone 15 Pro Max
   */
  const iphoneMatch = normalized.match(
    /\b(?:iphone\s*)?(\d{1,2})(?:\s*(pro max|pro|plus|mini))?\b/i,
  );

  if (iphoneMatch) {
    const generation = iphoneMatch[1];
    const variant = iphoneMatch[2]?.toLowerCase();

    return variant ? `${generation} ${variant}` : generation;
  }

  return null;
}

/*
 * نمونه‌ها:
 *
 * 256GB               => 256
 * 256 gb              => 256
 * 256 گیگ             => 256
 * ظرفیت 256 گیگابایت  => 256
 */
function extractStorage(text: string): number | null {
  const normalized = normalizeText(text);

  const storageMatch = normalized.match(
    /\b(32|64|128|256|512|1024|2048)\s*(?:gb|g|گیگ|گیگابایت)\b/i,
  );

  if (!storageMatch) {
    return null;
  }

  return Number(storageMatch[1]);
}

function isStockProduct(normalizedTitle: string): boolean {
  return hasAnyKeyword(normalizedTitle, [
    'استوک',
    'کارکرده',
    'دست دوم',
    'دست‌دوم',
    'used',
    'refurbished',
    'ریفربیشد',
  ]);
}

function hasAnyKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function normalizeText(value: string): string {
  return convertPersianDigitsToEnglish(
    value
      .toLowerCase()
      .trim()
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/‌/g, ' ')
      .replace(/[-_/|()]/g, ' ')
      .replace(/\s+/g, ' '),
  );
}

function convertPersianDigitsToEnglish(value: string): string {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

  return value
    .replace(/[۰-۹]/g, (digit) => {
      return String(persianDigits.indexOf(digit));
    })
    .replace(/[٠-٩]/g, (digit) => {
      return String(arabicDigits.indexOf(digit));
    });
}