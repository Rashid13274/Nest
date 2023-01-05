import { 
    Controller,
    Post, 
    Get, 
    ValidationPipe,
    Body, 
    UsePipes, 
    Inject,
    Param, 
    UseGuards, 
    HttpException,
    Query
 } from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthenticatedGuard } from 'src/auth/utlis/localGuard';
import { UserService } from '../user-service/user-service.service';
import { UserDto } from '../Dto/user.dto';
import { FilterDto } from '../Dto/filter.dto';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UserControllerController {
    private logger  = new Logger('UserControllerController');
    constructor(
    @Inject('USER_SERVICE') 
    // @Inject('WINSTON_MODULE_PROVIDER')  
    // private readonly logger: Logger,
     private userService:UserService){}
    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto:UserDto){
        this.logger.verbose(`${userDto.username} creating an user account ${JSON.stringify(userDto)}`)
        return this.userService.create(userDto);

    }
    @UseGuards(AuthenticatedGuard)
    @Get()
    async getAllUser(){
        return await this.userService.findAlluser();
    }

    @Get('username/:username')
     async getByuserName(@Param('username') username:string){
        const user = this.userService.findUserByUserName(username);
        if(user){
            return user;
        }else{
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
     }
    @Get('filter')
    async getUserByFilter(@Query() filterdto:FilterDto){
        return await this.userService.getFilter(filterdto);
    }


}


/*import { Controller, Get, Param, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PlatformAccountService } from 'src/core/platform-account/platform-account.service';
import { Logger } from 'winston';

@Controller('api/platform-accounts')
export class PlatformAccountApiController {

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly platformAccountService: PlatformAccountService) { }

    @Get(':accountId')
    async findOne(@Param() params) {

        this.logger.debug(`request=> fetch PLATFORM-ACC:${params.accountId}`);
        return await this.platformAccountService.findOne(params.accountId);
    } */


