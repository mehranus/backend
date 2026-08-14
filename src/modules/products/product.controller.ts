import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productsServis:ProductService
  ){}
  @Get("search")
  query(@Query('q') query:string){
   return this.productsServis.search(query)
  }
}
