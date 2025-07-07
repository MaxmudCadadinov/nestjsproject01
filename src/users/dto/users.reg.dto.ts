import { IsString, IsOptional,IsEnum } from 'class-validator';
import { user_status } from '../users.entity';


export class CreateRegDto {
  
  @IsString()
  user_name: string

  @IsString()
  user_lastname: string
  
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(user_status, { message: 'Status must be user or admin' })
  status?: user_status;



 
}