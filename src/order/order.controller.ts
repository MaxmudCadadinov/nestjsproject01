import { Controller, Post, UseGuards, Body, Request, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from '../jwt/jwt_auth.guard'; // путь к вашему guard'у
import { addToCartDto } from './order.dto'



@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add_to_cart')
  @HttpCode(201)
  async add_to_cart(@Request() req, @Body() dto: addToCartDto){
    const user_id = req.user.userId
    return  this.ordersService.add_to_cart(dto, user_id)
    
  }

@UseGuards(JwtAuthGuard)
@Post('/return_shops')
@HttpCode(201)
async return_shops(@Request() req)  {
  const user_id = req.user.userId
  return this.ordersService.return_shops(user_id)
}
}

