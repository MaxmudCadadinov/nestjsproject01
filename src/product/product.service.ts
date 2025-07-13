import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,

  ) { }

  async add_product(dto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const new_product = await this.productsRepo.create({ ...dto, image: file.filename })
    return await this.productsRepo.save(new_product)

  }

  async del_product(id: number): Promise<void> {
    const product = await this.productsRepo.findOneBy({ id: id })
    if (!product) { throw new Error('Product not found') }
    await this.productsRepo.remove(product)

  }



  async decreased_product(id: number, num: number): Promise<void> {
    const product = await this.productsRepo.findOneBy({ id: id })
    if (!product) { throw new Error('Product not found') }
    if (product.quantity < num) { throw new Error('Not enough quantity') }
    product.quantity -= num
    await this.productsRepo.save(product)
  }


  async find_all(page: number) {
    const limit = 10
    const skip = (page - 1) * 10
    const all_product_list = await this.productsRepo.find({ skip, take: limit })
    const new_list = all_product_list.map(product => ({ ...product, image: `http://localhost:3000/images/${product.image}` }))
    const count = await this.productsRepo.count()
    console.log(count)
    const count_page = Math.ceil(count / 10)
    console.log(count_page)
    return { "list": new_list, "count": count_page }
  }
}




