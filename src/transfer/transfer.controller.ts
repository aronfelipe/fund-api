import { Controller, Get, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseInterface } from 'src/utils/response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { Token } from 'src/token/token.model';
import { Transfer } from './transfer.model';
import { OneTransfer } from './body/store.transfer';
import { Response } from 'express';

@Controller('transfer')
export class TransferController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
        @InjectRepository(Transfer)
        private transferRepository: Repository<Transfer>) {}

    @Get()
    async findAll(): Promise<ResponseInterface> {
        try {
            const response = <ResponseInterface> {
                message: "Find all successful",
                response: await this.transferRepository.find({relations:["token", "user"]}),
                status: 200
              }
            return response;
        } catch (error) {
            return error
        }
    }
    @Post()
    async storeOne(@Body() body: OneTransfer): Promise<ResponseInterface> {
        try {
            const userdb = await this.userRepository.findOne({where:{email:body.email}});
            const tokendb = await this.tokenRepository.findOne({where:{symbol: body.symbol}});

            if (!userdb) {
                throw new HttpException('Esse usuário não existe', HttpStatus.NOT_FOUND);
            }

            if (!tokendb) {
                throw new HttpException('Esse token não existe', HttpStatus.NOT_FOUND);
            }

            const transferInsert = await this.transferRepository.insert({
                user: userdb,
                token: tokendb,
                quantity: body.quantity
            });
            const transferdb = await this.transferRepository.findOne(transferInsert['identifiers'][0]['id']);
            const response = <ResponseInterface> {
                message: "Store successful",
                response: transferdb,
                status: 200
              }
            return response;
        } catch (error) {
            return error
        }
    }

    @Get("consumer")
    async findAllConsumer(@Res() res: Response): Promise<any> {
        try {
            const userdb = await this.userRepository.findOne(res.locals.userId);
            const transfers = await this.transferRepository.find({where: {user: userdb}, relations:["token"]});
            const response = <ResponseInterface> {
                message: "Find all successful",
                response: transfers,
                status: 200
              }
            return res.send(response);
        } catch (error) {
            return error
        }
    }
}
