import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateRegDto } from './dto/users.reg.dto'
import { CreateLoginDto } from './dto/auth.login.dto'


@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post('/add_user')
@HttpCode(201)
async add_user(@Body() dto: CreateRegDto) {
  return await this.usersService.add_user(dto)
}

@Delete('/delete_user/:id')
@HttpCode(204)
async delete_user(@Param('id', ParseIntPipe) id: number){
  return  this.usersService.delete_user(id)
}

@Post('/login')
@HttpCode(201)
async login(@Body() dto: CreateLoginDto) {
    return this.usersService.login(dto)
}



}
 




