import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user-service/user-service.service";
import { User } from "src/user/user.entity";
 export class SessionSerializer extends PassportSerializer{
    
    constructor(@Inject('USER_SERVICE') private readonly userService:UserService){
        super();
    }

    serializeUser(user: User, done:(err, user:User)=>void) {
        done(null, user);
        
    }

    async deserializeUser(user: User, done:(err, user:User)=>void) {
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done(null, userDB):done(null, null); // if the user is found in database
                                                            // pass the null as error in first argument
                                                            // and userDB(user) as second argument in
                                                            // done function.
        
    }
 }