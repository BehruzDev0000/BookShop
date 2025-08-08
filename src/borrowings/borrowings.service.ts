import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { Borrowing } from './entities/borrowing.entity';
import { handleError } from 'src/utils/handle-error';
import { successResponse } from 'src/utils/success.response';

@Injectable()
export class BorrowingsService {
   constructor(
    @InjectModel(Borrowing) private readonly borrowingModel: typeof Borrowing,
  ) { }
  async create(createBorrowingDto: CreateBorrowingDto) {
    try {
      const borrow = await this.borrowingModel.create({...createBorrowingDto})
      return successResponse(borrow,201)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const borrowings = await this.borrowingModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
      return successResponse(borrowings)
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const borrow = await this.borrowingModel.findByPk(id, { include: { all: true } });
      if(!borrow){
        throw new NotFoundException('Borrowing not found')
      }
      return successResponse(borrow)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateBorrowingDto: UpdateBorrowingDto) {
    try {
      const borrow = await this.borrowingModel.update(updateBorrowingDto, {
        where: { id },
        returning: true,
      });
      if (borrow[0] === 0) {
        throw new NotFoundException('Borrowing not found');
      }
      return successResponse(borrow[1][0])
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const borrow = await this.borrowingModel.destroy({where:{id}})
      if(borrow===0){
        throw new NotFoundException('Borrowing not found')
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }
}
