// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie:
      {
        secure: false, // IF I SET TRUE, COOKIES.SID WILL NOT BE SHOWN 
        httpOnly: false,        
        maxAge: 3600000, // 60 MINUTES
      }
    })
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();