import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

 
// for login 
@Injectable()
export class LocalAuthGuard extends  AuthGuard('local'){
    async canActivate(context:ExecutionContext){
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        return result; 
    } 
}
    // to guard the our endpoint
    @Injectable()
    export class AuthenticatedGuard implements CanActivate{
       async canActivate(context:ExecutionContext):Promise<any>{
        const req =  context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
       }
    }

    