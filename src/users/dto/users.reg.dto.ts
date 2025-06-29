import { IsString, IsNumber } from 'class-validator';

export class CreateRegDto {
  
  @IsString()
  user_name: string

  @IsString()
  user_lastname: string
  
  @IsString()
  email: string;

  @IsString()
  password: string;



  
}