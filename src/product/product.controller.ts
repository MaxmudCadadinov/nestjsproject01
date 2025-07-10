import { Controller, Body, Post, Delete, Param, Get, ParseIntPipe, HttpCode,UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto }  from './product.dto'; 
import { Product } from './product.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  

  @Post('/add_product')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images',
      filename(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
      },
    })
  }))
  async add_product( @Body() dto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    
  const product = await this.productService.add_product(dto, file);
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


  
  @Get('/all_products/:page')
  @HttpCode(200)
  async all_products(@Param("page",ParseIntPipe) page:number): Promise<Product[]> {
    return  await this.productService.find_all(page);
  }


}   


