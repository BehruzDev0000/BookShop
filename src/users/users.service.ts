import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from 'src/utils/handle-error';
import { User } from './entities/user.entity';
import { successResponse } from 'src/utils/success.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const {email}=createUserDto
      const existsEmail= await this.userModel.findOne({
        where:{email}
      })
      if(existsEmail){
        throw new ConflictException('Email already exists')
      }
      const user = await this.userModel.create({...createUserDto})
      return successResponse(user,201)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
  try {
    const users = await this.userModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return successResponse(users)
  } catch (error) {
    handleError(error)
  }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findByPk(id,{include:{all:true}})
      if(!user){
        throw new NotFoundException('User not found')
      }
      return successResponse(user)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.update(updateUserDto,{
        where:{id},
        returning:true
      })
      if(user[0]===0){
        throw new NotFoundException('User not found')
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }

 async remove(id: number) {
    try {
      const user = await this.userModel.destroy({where:{id}})
      if(!user){
        throw new NotFoundException('User not found')
      }
      return successResponse({})
    } catch (error) {
      handleError(error)
    }
  }
}
