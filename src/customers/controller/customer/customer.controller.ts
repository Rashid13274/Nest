import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    HttpStatus,
    HttpException,
    Param,
    Body, 
    UsePipes,
    ValidationPipe,
    Query} from '@nestjs/common';

import { CreateCustomerDto } from './Dto/createCustomerDto';
import { CustomerService } from 'src/customers/service/customer/customer.service';
import { Customer } from 'src/customers/service/type_Interface/customer';

@Controller('customer')
export class CustomerController {
    constructor(private customersService:CustomerService){}

// =============================================================================//
// MongoDb CRUD

// @Get()
// getTasks(@Query() filterDto: CreateCustomerDto): Promise<Customer[]> {
//   return this.customersService.getcustomerByFilter(filterDto);
// }
@Get()
    findAll():Promise<Customer[]>{
        return this.customersService.findall();
    }

    @Get(':id')
    findOne(@Param('id') id):Promise<Customer>{
        const item = this.customersService.findOne(id);
        if(item) return this.customersService.findOne(id)
        else throw new HttpException('Customer Not Found !', HttpStatus.BAD_REQUEST);
    }
    @Post()
    @UsePipes(ValidationPipe)
   create(@Body() createCustomerDto:CreateCustomerDto):Promise<Customer>{
    return this.customersService.create(createCustomerDto);
    }

    @Delete(':id')
   deleteItem(@Param ('id') id):Promise<Customer>{
    return this.customersService.delete(id);
   }
   
   @Put(':id')
   update(@Body() updateCustomerDto :CreateCustomerDto, @Param('id') id): Promise<Customer>{
    return  this.customersService.update(id, updateCustomerDto);
   }

}

