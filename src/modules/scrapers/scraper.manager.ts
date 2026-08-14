import { ProductIterface } from "../products/product.interface";
import { ScraperInterface } from "./scrapers.interface";


export class ScraperManager{
  constructor(
    private readonly scrapers:ScraperInterface[]
  ){}

  async search(qerury:string):Promise<ProductIterface[]>{
    const resulets=await Promise.all(this.scrapers.map((scraper)=>scraper.search(qerury)),);
    return resulets.flat()
  }
}