import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer/customer.controller';
import { CustomerService } from './service/customer/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {CustomerSchema} from './Schema/customerSchema';


@Module({
imports: [MongooseModule.forFeature([{name:'Customer',schema:CustomerSchema}])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomersModule {}
/* 
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsSchema } from './schema/items.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:'Item',schema:ItemsSchema}])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
*/