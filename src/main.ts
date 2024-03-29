import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepository } from "typeorm";
import { User } from './user/user.model';
import * as crypto from "crypto-js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const userRepository = getRepository(User);
  if (await userRepository.findOne({where:{email:"aron@aron.com"}})) {
    await app.listen(5000);
  } else {
    const salt = Math.random().toString(16);
    const passwordSalt = process.env.PASSWORD_API + salt;
    const password = crypto.SHA256(passwordSalt).toString();
    await userRepository.insert({email: "aron@aron.com", password: password, salt: salt, role: "admin"})
    await app.listen(5000);
  }
}

bootstrap();
