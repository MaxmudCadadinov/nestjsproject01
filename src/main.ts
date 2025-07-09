import { NestFactory } from '@nestjs/core';
import { AppModule, } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '../response.interceptor';
import * as bodyParser from 'body-parser';
import 'dotenv/config';
import * as express from 'express';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/webhook', bodyParser.raw({ type: 'application/json' }))
  app.use(bodyParser.json())
  app.useGlobalPipes(new ValidationPipe());
  app.use('/images', express.static('images'))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
