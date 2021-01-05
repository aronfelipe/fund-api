import { Controller, Get, Post, Body, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseInterface } from 'src/utils/response.interface';
import { Token } from './token.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OneToken } from './body/store.token';

@Controller('token')
export class TokenController {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>) {}
    
    @Get()
    async findAll(): Promise<ResponseInterface> {
        try {
            const response = <ResponseInterface> {
                message: "Find all successful",
                response: await this.tokenRepository.find(),
                status: 200
              }
            return response;
        } catch (error) {
            return error
        }
    }

    @Post()
    async storeOne(@Body() body: OneToken): Promise<ResponseInterface> {
        try {
            
            const tokenInsert = await this.tokenRepository.insert({
                symbol: body.symbol,
                value: body.value
            });
            const tokendb = await this.tokenRepository.findOne(tokenInsert['identifiers'][0]['id']);
            const response = <ResponseInterface> {
                message: "Store successful",
                response: tokendb,
                status: 200
              }
            return response;
        } catch (error) {
            return error
        }
    }

    @Patch()
    async updateOne(@Body() body: OneToken): Promise<ResponseInterface> {
        try {
            let tokendb;
            
            tokendb = await this.tokenRepository.findOne({where:{"symbol": body.symbol}});

            if (!tokendb) {
                throw new HttpException('Esse token não existe', HttpStatus.NOT_FOUND);
            }

            const tokenUpdate = await this.tokenRepository.save({
                id: tokendb.id,
                value: body.value
            });

            tokendb = await this.tokenRepository.findOne(tokenUpdate.id);

            const response = <ResponseInterface> {
                message: "Update successful",
                response: tokendb,
                status: 200
              }
            return response;

        } catch (error) {
            return error
        }
    }}
