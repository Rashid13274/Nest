import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
export class UserDto{
    @IsNotEmpty()
    @MinLength(3)
    username:string;

    @IsNotEmpty()
    @MinLength(5)
    password:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

}