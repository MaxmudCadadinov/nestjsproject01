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

){}

async add_product(dto: CreateProductDto): Promise<Product>{
    const new_product = await this.productsRepo.create(dto)
    return await this.productsRepo.save(new_product)
    
} 

async del_product(id: number): Promise<void>{
    const product = await this.productsRepo.findOneBy({ id: id })
    if (!product){throw new Error('Product not found')}
    await this.productsRepo.remove(product)
    
}
    


async decreased_product(id: number, num: number): Promise<void> {
  const product = await this.productsRepo.findOneBy({id: id})
  if(!product){throw new Error('Product not found')}
  if (product.quantity < num){throw new Error('Not enough quantity')}
  product.quantity -= num
  await this.productsRepo.save(product)
}
 }
    



  