// when we implements interface we have to  implement all of his abstract method when we're using 
// interface. here NestjsMiddleware has only one abstract method.

// middlware supports dependency injection similar to service and controller.

import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request,Response } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log('hello, World  I am inside the validateUserMiddleware !');
        const {authorization} = req.headers;

    if(!authorization) return  res.status(403).send({error:'No autherization Token provided!'});
    next()
    
    //GETTING ERROR IN THIS PART OF CODE.

    /* if(authorization =='123'){
        }else{
            return
            res
            .status(403)
            .send({error:'Invalid Authentication Token Provided' !})
        } */
        
    }
}
  