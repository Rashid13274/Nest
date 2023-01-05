import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/utlis/bcrypt';

import { Repository } from 'typeorm';
import { FilterDto } from '../Dto/filter.dto';
import { UserDto } from '../Dto/user.dto';
import { User } from '../user.entity';
import { Logger } from '@nestjs/common';
@Injectable()
export class UserService {
    private logger = new Logger();
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

    create(userDto:UserDto){
        const password = encodePassword(userDto.password);
        console.log(password);
        const newuser =  this.userRepository.create({...userDto, password});
        return  this.userRepository.save(newuser);
    }

    async findUserByUserName(username:string){
    return await this.userRepository.findOneBy({username});  
    }

    async findUserById(id:number){
        return await this.userRepository.findOneBy({id});
    }
    async findAlluser(){
        return await this.userRepository.find();
    }
    async getFilter(filterdto:FilterDto){
        const {username,search}= filterdto;
        const query = this.userRepository.createQueryBuilder('user'); 
        // here query :  it uses the userRepository and create a query object. and argument passed
        // in createQueryBuilder('user) dictate how i can refer to user within my queries.
        // simply when i mentioned 'user' in our query typeorm knows i uses User Entity.

        /* if(username){
            query.andWhere(
                `LOWER(user.username) LIKE LOWER(:username) OR LOWER(user.email) LIKE LOWER(:username)`,
                {username:`%${username}`},
            )
        } */
        
        if(search){
            query.andWhere(
                `LOWER(user.usernamsklsjse) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search)`,
                {search:`%${search}`},
            )
        }
        try{

            const users = await query.getMany(); // get many refers we wanna get many user based on
                                                // our condition fullfillment;
            return users;
        }
        catch(error){
            this.logger.error(
            `failed to get the users ${filterdto.username}
            FILTERS: ${JSON.stringify(filterdto)}`,
            error.stack
            )
            throw new InternalServerErrorException();
        }
        
    }
}
