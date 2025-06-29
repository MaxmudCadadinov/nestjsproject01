import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './users.entity'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  PassportModule,
  ConfigModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      secret: config.get('JWT_SECRET'),
      signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') || '1h' },
    }),
    inject: [ConfigService],
  }),
],
controllers: [UsersController],
providers: [UsersService, JwtStrategy],
exports: [UsersService, JwtModule],
})
export class UsersModule {}
