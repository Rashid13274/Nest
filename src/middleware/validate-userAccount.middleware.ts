import { Injectable, NestMiddleware} from "@nestjs/common";
import{Request, Response, NextFunction} from 'express';

@Injectable()
// second middlware  to validate userAccount (for testing purpose only)
export class ValidateUserAccountMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const {valid} =  req.headers;
        console.log(valid);
        console.log('validateUserAccountMiddleware');
        if(valid){
            next()
        }else{
            res.status(401).send({error: 'Account is invalid !'});
        }
        
    }
}