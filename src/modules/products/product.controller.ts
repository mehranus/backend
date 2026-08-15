import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchProductDto } from './dto/search-product.dto';

@ApiTags("Products")
@Controller('products')
export class ProductController {
  constructor(
    private readonly productsServis:ProductService
  ){}
@Get('search')
@ApiOperation({
  summary: 'Search products',
  description: 'Search for products across available stores.',
})
@ApiQuery({
  name: 'q',
  required: true,
  type: String,
  example: 'iPhone 15 128GB',
  description: 'Product search query',
})
@ApiResponse({
  status: 200,
  description: 'Products found successfully.',
})
@ApiResponse({
  status: 400,
  description: 'Search query is invalid.',
})
search(@Query() query: SearchProductDto) {
  return this.productsServis.search(query.q);
}
}
