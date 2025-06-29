import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity'
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateRegDto } from './dto/users.reg.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        private readonly configService: ConfigService,
        private jwtService: JwtService,

    ){}

//
async add_user(dto: CreateRegDto): Promise<Omit<Users, 'password'>>{
    //Хещирование парольяs
    const saltRounds = Number(this.configService.get('BCRYPT_SALT')) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(dto.password, salt)

    const user_to_save = {...dto, password: hashed_password}
    const new_user = await this.usersRepo.create(user_to_save)
    const saved_user = await this.usersRepo.save(new_user)
    const { password, ...userWithoutPassword } = saved_user;
    return userWithoutPassword
}
//
async delete_user(id): Promise<void> {
    const del_user = await this.usersRepo.findOneBy({id: id})
    if (!del_user){throw new Error('Пользователь не найден')}
    await this.usersRepo.remove(del_user)
}


//
async login(dto: { email: string; password: string }): Promise<{ access_token: string }> {
    const user = await this.usersRepo.findOneBy({'email': dto.email})
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {throw new UnauthorizedException('Неверный email или пароль')}

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token }
    
}
}
