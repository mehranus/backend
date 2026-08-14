import { ProductIterface } from "../products/product.interface";


export interface ScraperInterface{
  search(query:string):Promise<ProductIterface[]>;
}