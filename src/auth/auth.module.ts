import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user-service/user-service.service';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth_c_s/auth.controller';
import { AuthService } from './auth_c_s/auth.service';
import { LocalStrategy } from './utlis/localStrategy';
import { SessionSerializer } from './utlis/sessionSerializer';

@Module({
  imports:[TypeOrmModule.forFeature([User]),PassportModule.register({
    session:true,
  })],
  controllers: [AuthController],
  providers: [{
    provide:'AUTH_SERVICE',
    useClass:AuthService  // this actually allows you to use the token to inject the auth service for us.

  },
{
  provide:'USER_SERVICE',
  useClass:UserService
},
LocalStrategy,
SessionSerializer
]
})
export class AuthModule {}
