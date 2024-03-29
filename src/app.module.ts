import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { AuthenticationModule } from './authentication/authentication.module';
import { TokenMiddleware } from './middlewares/check.jwt';
import { RoleMiddleware } from './middlewares/check.role';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { TransferModule } from './transfer/transfer.module';
import { Transfer } from './transfer/transfer.model';
import { BalanceModule } from './balance/balance.module';
import { Balance } from './balance/balance.model';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'kashin.db.elephantsql.com',
    port: 5432,
    username: 'hsbvrpsz',
    password: '5-WqK6kba4w3g747qKwllGW5FhOhtYTt',
    database: 'hsbvrpsz',
    entities: [User, Token, Transfer, Balance],
    synchronize: true,
  }), AuthenticationModule, TokenModule, TransferModule, BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware, RoleMiddleware)
      .exclude(
        { path: 'transfer/consumer', method: RequestMethod.GET },
        { path: 'user/consumer/profile', method: RequestMethod.GET }
      )
      .forRoutes('user', 'token', 'transfer')
      
  }
}
