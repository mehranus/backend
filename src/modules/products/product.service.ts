import { Injectable } from '@nestjs/common';
import { ScraperManager } from '../scrapers/scraper.manager';
import { ProductInterface } from './product.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly scraperManager: ScraperManager,
  ) {}

  async search(query: string): Promise<{
    query: string;
    results: ProductInterface[];
  }> {
    const results = await this.scraperManager.search(query);

    return {
      query,
      results,
    };
  }
}