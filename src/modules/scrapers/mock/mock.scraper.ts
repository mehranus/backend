import { ProductInterface } from "@/modules/products/product.interface";
import { ScraperInterface } from "../scrapers.interface";


export class MockScraper implements ScraperInterface{
  async search(query: string): Promise<ProductInterface[]> {
    return[
    //   {
    //   // id:'mock-iphone-15',
    //   // title:`${query} 128GB`,
    //   // url:'https://exampel.com/product/iphone-15',
    //   // image:undefined,
    //   // price:65000000,
    //   // currency:'IRT',
    //   // store:{
    //   //   name:'mehran-store',
    //   //   url:'mehranstor.com'
    //   // },
    //   // availability:true,
    //   // scrapedAt:new Date(),


    // },
  ]
  }
}