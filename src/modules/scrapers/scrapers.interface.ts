import { ProductInterface } from "../products/product.interface";


export interface ScraperInterface{
  search(query:string):Promise<ProductInterface[]>;
}