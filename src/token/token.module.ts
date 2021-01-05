import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenController } from './token.controller';
import { Token } from './token.model';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [],
  controllers: [TokenController],
})
export class TokenModule {}
