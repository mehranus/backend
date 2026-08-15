import { Injectable } from '@nestjs/common';
import { ProductInterface } from '../products/product.interface';
import { ScraperInterface } from './scrapers.interface';

@Injectable()
export class ScraperManager {
  constructor(
    private readonly scrapers: ScraperInterface[],
  ) {}

  async search(query: string): Promise<ProductInterface[]> {
    const results = await Promise.all(
      this.scrapers.map((scraper) => scraper.search(query)),
    );

    return results.flat();
  }
}