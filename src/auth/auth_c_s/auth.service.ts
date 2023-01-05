import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { UserService } from 'src/user/user-service/user-service.service';
import { comparePassword } from '../utlis/bcrypt';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly  userService:UserService){}
    async validateUser(username:string, password:string){
        console.log('Inside ValidateUser');
        const userDB = await this.userService.findUserByUserName(username);

         if(userDB){
            const  matched = comparePassword(password, userDB.password)
            if(matched){
            console.log('User Validation Sucess !');
            return userDB;
            }else{
                console.log('password do not matched !');
                return null;
            }
        }
        console.log('User Validation Failed ! ');
        return null;
    }
    
    }

