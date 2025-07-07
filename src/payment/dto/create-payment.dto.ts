

import { IsInt, IsArray, ArrayMinSize, IsObject, ValidateNested, Min } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Нужно передать хотя бы один товар' })
  items: {
    productID: number;
    quantity: number;
  }[];
}


