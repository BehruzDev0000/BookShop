import { Module } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Borrowing } from './entities/borrowing.entity';

@Module({
  imports:[SequelizeModule.forFeature([Borrowing])],
  controllers: [BorrowingsController],
  providers: [BorrowingsService],
})
export class BorrowingsModule {}
