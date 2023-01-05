import { Controller,Post, UseGuards,Get,Body,Session,Param, Inject, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Request } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from '../utlis/localGuard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // constructor(@Inject('AUTH_SERVICE') private readonly authService:AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(){}


    @Get('')
    //  it's just for show case how session works and looks like.  
    async getAuthSession(@Session() session:Record<string,any>){
        console.log(session);
        console.log(session.id);
        session.authenticated = true;
        return session;
    }
    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req:Request){
        return req.user;
    }

}
