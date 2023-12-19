import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { query } from 'express';
import{ Query as ExpressQuery} from 'express-serve-static-core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<User>{
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query:ExpressQuery):Promise<User[]> {
    console.log(query);
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) :Promise<User>{
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
