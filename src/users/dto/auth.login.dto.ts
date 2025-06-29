import { IsString, IsNumber } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  
}