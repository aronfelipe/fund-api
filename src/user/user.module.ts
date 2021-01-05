import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenMiddleware } from 'src/middlewares/check.jwt';
import { UserController } from './user.controller';
import { User } from './user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'user/consumer/profile', method: RequestMethod.GET })
  }
}