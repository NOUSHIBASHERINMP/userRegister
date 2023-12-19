
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema({
    timestamps:true
})

export class User extends Document {
    
@Prop()
name:string;

@Prop()
age:number;

@Prop()
job:string;

@Prop({
unique:[true,'The Email Entered Is Already In Use ']})
email:string;

@Prop()
address:string;


}
export const UserSchema = SchemaFactory.createForClass(User);
