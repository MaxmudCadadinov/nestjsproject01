import { IsString, IsNumber } from 'class-validator';

export class addToCartDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;

  
}