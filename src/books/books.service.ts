import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { handleError } from 'src/utils/handle-error';
import { successResponse } from 'src/utils/success.response';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private readonly BookModel: typeof Book,
  ) { }
async create(createBookDto: CreateBookDto){
    try {
      const newBook = await this.BookModel.create({...createBookDto})
      return successResponse(newBook,201)
    } catch (error) {
      handleError(error)
    }
  }
async findAll(){
  try {
    const books = await this.BookModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return successResponse(books,200)
  } catch (error) {
    handleError(error)
  }
}
 async findOne(id:number){
  try {
    const book=await this.BookModel.findByPk(id,{include:{all:true}})
    if(!book){
      throw new NotFoundException('Book not found')
    }
    return successResponse(book,200)
  } catch (error) {
    handleError(error)
  }
 }

  async update(id:number,updateBookDto:UpdateBookDto){
    try {
      const book = await this.BookModel.update(updateBookDto,{
      where:{id},
      returning:true
    })
    if(book[0]===0){
      throw new NotFoundException('Book not found')
    }
    return successResponse(book[1][0])
  } catch (error) {
    handleError(error)
  }
  }
  

 async remove(id:number){
  try {
    const book = await this.BookModel.destroy({ where: { id } });
      if (book === 0) {
        throw new NotFoundException('Book not found');
      }
      return successResponse({})
  } catch (error) {
    handleError(error)
  }
 }
}
