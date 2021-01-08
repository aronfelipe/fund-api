import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from 'src/transfer/transfer.model';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { Balance } from './balance.model';

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Transfer)
        private transferRepository: Repository<Transfer>, 
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>) {}

  private readonly logger = new Logger(BalanceService.name);

  @Cron('0 0 0 * * 1-7')
//   @Cron('45 * * * * *')
  async snapshotBalances() {
    try {
      const usersdb = await this.userRepository.find();
      usersdb.forEach(async user => {
          const transfers = await this.transferRepository.find({where: {user: user}, relations:["token"]});
          console.log(transfers)
          let value = 0;
          for (let transfer in transfers) {
              value = value + (parseFloat(transfers[transfer].quantity) * parseFloat(transfers[transfer].token.value));
          }
          console.log(user)
          const insertBalance = await this.balanceRepository.insert({
              value: JSON.stringify(value),
              user: user
          })
      })
    } catch (error) {
        console.log(error)
    }
    }
}