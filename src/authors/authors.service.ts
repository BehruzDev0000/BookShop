import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';
import { handleError } from 'src/utils/handle-error';
import { successResponse } from 'src/utils/success.response';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author)private readonly authorModel: typeof Author,
  ){}
 async create(createAuthorDto: CreateAuthorDto){
  try {
    const newauthor =await this.authorModel.create({...createAuthorDto})
    return successResponse(newauthor,201)
  } catch (error) {
    handleError(error)
  }
 }

 async findAll(){
    try {
      const authors = await this.authorModel.findAll()
      return successResponse(authors,200)
    } catch (error) {
      handleError(error)
    }
  }

 async findOne(id: number) {
    try {
      const author = await this.authorModel.findByPk(id)
      if(!author){
        throw new NotFoundException('Author not found')
      }
      return successResponse(author,200)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const author = await this.authorModel.update(updateAuthorDto,{
        where:{id},
        returning:true
      })
      if(author[0]===0){
        throw new NotFoundException('Author not found')
      }
      return successResponse(author[1][0])
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
   try {
    const author = await this.authorModel.destroy({where:{id}})
    if(author === 0){
      throw new NotFoundException('Author not found')
    }
    return successResponse({})
   } catch (error) {
    handleError(error)
   }
  }
}
