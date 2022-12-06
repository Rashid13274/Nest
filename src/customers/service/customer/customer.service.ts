import { Injectable } from '@nestjs/common';
import { Customer } from '../type_Interface/customer';
import { InjectModel } from '@nestjs/mongoose';
import{Model} from 'mongoose';
import { CreateCustomerDto } from 'src/customers/controller/customer/Dto/createCustomerDto';



@Injectable()
export class CustomerService {
distributionChannelsDocumentModel: any;
constructor(@InjectModel('Customer') private readonly customerModel:Model<Customer>) {}


//=========================================================================//
// MONGODB CRUD
async findall():Promise<Customer[]>{
    return await this.customerModel.find();
}

async findOne(id:string):Promise <Customer>{
 return await this.customerModel.findOne({_id:id});
}

async create(Customer:Customer):Promise<Customer>{
    const newCustomer = new this.customerModel(Customer);
    return await newCustomer.save();
}

async delete(id: string):Promise<Customer>{
 return await  this.customerModel.findByIdAndRemove(id);
}

async update(id:string, Customer:Customer):Promise<Customer>{
    return await this.customerModel.findByIdAndUpdate(id, Customer,{new :true});

}

}