import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject } from "@nestjs/common";
import { AuthService } from "../auth_c_s/auth.service";
import { UnauthorizedException } from "@nestjs/common/exceptions";
 export class LocalStrategy extends  PassportStrategy(Strategy){
constructor(@Inject('AUTH_SERVICE') private readonly authService:AuthService){
    super()
}
async validate(username:string,password:string){
    // console.log('Inside the LocalStrategy/validate');
    // console.log(username);
    // console.log(password);
const user = this.authService.validateUser(username, password);
if(!user){
    throw new UnauthorizedException();
}
return user;
    
}

 }