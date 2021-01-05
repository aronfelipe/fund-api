import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from 'src/transfer/transfer.model';
import { User } from 'src/user/user.model';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { TokenMiddleware } from 'src/middlewares/check.jwt';
import { Balance } from './balance.model';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Transfer]), TypeOrmModule.forFeature([Balance])
  ],
  providers: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(TokenMiddleware)
        .forRoutes({ path: 'balance/consumer', method: RequestMethod.GET })
    }
  }