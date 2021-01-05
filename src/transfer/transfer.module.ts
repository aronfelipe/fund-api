import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Transfer } from './transfer.model';
import { Token } from 'src/token/token.model';
import { TransferController } from './transfer.controller';
import { TokenMiddleware } from 'src/middlewares/check.jwt';
import { RoleMiddleware } from 'src/middlewares/check.role';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Transfer]), TypeOrmModule.forFeature([Token])],
  providers: [],
  controllers: [TransferController],
})

export class TransferModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'transfer/consumer', method: RequestMethod.GET })
  }
}