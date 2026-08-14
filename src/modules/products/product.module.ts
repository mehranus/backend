import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ScraperManager } from '../scrapers/scraper.manager';
import { ScraperModule } from '../scrapers/scraper.module';

@Module({
  imports:[ScraperModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
