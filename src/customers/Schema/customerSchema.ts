import  * as  mongoose from  'mongoose';

export const CustomerSchema= new mongoose.Schema({
  name:String,
  qty:Number,
  description:String
});
