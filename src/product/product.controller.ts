import { Controller, Body, Post, Delete, Param, Get, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto }  from './product.dto'; 


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add_product')
  @HttpCode(201)
  async add_product( @Body() dto: CreateProductDto ) {
    
  const product = await this.productService.add_product(dto);
  return product
}

  @Delete('/del_product/:id')
  @HttpCode(204)
  async del_product(@Param('id', ParseIntPipe) id: number) {
    return this.productService.del_product(id); // +id преобразует в число
}

  @Delete('/decreased_products/:id/:num')
  @HttpCode(204)
  async decreased_product(@Param('id', ParseIntPipe) id: number, @Param('num', ParseIntPipe) num: number) {
    return this.productService.decreased_product(id, num)
}



}   


