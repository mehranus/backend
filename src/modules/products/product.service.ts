import { Injectable } from '@nestjs/common';
import { ScraperManager } from '../scrapers/scraper.manager';
import { ProductIterface } from './product.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly scraperManger:ScraperManager
  ){}

  async search(querey:string):Promise<{
    querey:string,
    resulets:ProductIterface[]
  }>{
    const resulets=await this.scraperManger.search(querey)
    return{
      querey,
      resulets
    }
  }
}
