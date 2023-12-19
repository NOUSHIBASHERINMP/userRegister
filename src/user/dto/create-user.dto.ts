

import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()  
  @IsString()
 readonly name: string;

  @IsNotEmpty() 
readonly age: number;

  @IsNotEmpty() 
  @IsString()
 readonly job: string;

  @IsNotEmpty() 
  @IsEmail({},{message:"Please Enter Correct Email"})
   readonly email: string;

   @IsNotEmpty()
   @IsNotEmpty()
   readonly address:string;
}