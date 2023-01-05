import { Module } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { ValidateUserMiddleware } from 'src/middleware/validate-user.middleware';
import { ValidateUserAccountMiddleware } from 'src/middleware/validate-userAccount.middleware';
import { UserControllerController } from './user-controller/user-controller.controller';
import { UserService } from './user-service/user-service.service';
import { User } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserControllerController],
  providers: [{
    provide:'USER_SERVICE',
    useClass:UserService
  }]
})

export class UserModule  {};

// implementing middleware class.

/* export class UserModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
     consumer.apply(ValidateUserMiddleware,ValidateUserAccountMiddleware,
      (req:Request,res:Response, next:NextFunction)=>{
        console.log('Last Middleware !');
        next();
      })
     .forRoutes({
      path:'user/username/:username',
      method:RequestMethod.GET,
     },
     {
      path:'user/create',
      method:RequestMethod.POST
    }
     )

    //  .forRoutes(UserControllerController)

    // .exclude(
    // {
    //   path:'user/username/:username',
    //   method:RequestMethod.GET
    // }
    // {
    //   path:'user/create',
    //   method:RequestMethod.POST
    // })
  //   .forRoutes(UserControllerController)
  // }

}
} */
