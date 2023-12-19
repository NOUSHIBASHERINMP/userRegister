import { Injectable ,BadRequestException,NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as  Mongoose  from 'mongoose';
import mongoose, { Model } from 'mongoose';
import{ Query } from 'express-serve-static-core';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private  userModel:mongoose.Model<User>
  ){}
  

  async create(createUserDto: CreateUserDto) {
    const userRegister = new this.userModel(createUserDto);
    const registred = await userRegister.save();
    return  registred ;
  }

 async findAll(query:Query):Promise<User[]> {

  const detPerPage = 2;
  const currentPage = Number(query.page) || 1;
  const skip = detPerPage * (currentPage - 1);

  const name = query.name?{
    name:{
      $regex: query.name,
      $options:'i'
    },
  }:{};
  const users = await this.userModel.find({...name}).sort({age:1}).limit(detPerPage).skip(skip);
    return users;
  }

 async findOne(id: string):Promise<User> {

  const isValidId = mongoose.isValidObjectId(id)
    if(!isValidId){
      throw new BadRequestException('Please Enter Correct ID ');
    }
  const userById = await this.userModel.findById(id);
  if(!userById){
    throw new NotFoundException('User Not Found');
  }
    return userById;
  }

   
  
  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(id,updateUserDto,{
      new:true,
      runValidators:true
    });
    if(! updated){
      throw new BadRequestException('Require Right one');
    }
    return  updated.save();
  }

async  remove(id: string){
  const isValidId = mongoose.isValidObjectId(id)
  if(!isValidId){
    throw new BadRequestException('Please Enter Correct ID ');
  }
    const removed = await this.userModel.findByIdAndDelete(id);
    return "Removed Successfully";
  }
}
