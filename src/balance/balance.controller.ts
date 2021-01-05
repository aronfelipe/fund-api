import { Controller, Get, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { ResponseInterface } from 'src/utils/response.interface';
import { Repository } from 'typeorm';
import { Balance } from './balance.model';
import { Response } from 'express';

@Controller('balance')
export class BalanceController {
    constructor(
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>,
        @InjectRepository(Balance)
        private userRepository: Repository<User>) {}

    @Get('consumer')
    async findAll(@Res() res: Response): Promise<any> {
        try {
            const userdb = await this.userRepository.findOne(res.locals.userId);
            const balances = await this.balanceRepository.find({where: {user: userdb}, });
            const response = <ResponseInterface> {
                message: "Find all successful",
                response: balances,
                status: 200
              }
            return res.send(response);
        } catch (error) {
            return error
        }
    }
}
