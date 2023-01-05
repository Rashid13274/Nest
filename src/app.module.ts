import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SessionEntity } from './Typeorm/Session';
import { DataSource } from "typeorm"

@Module({
  imports: [UserModule,AuthModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'auth_typeorm',
    // entities:[User,SessionEntity], //SessionEntity
    entities:[User],
    synchronize:true, // do not use  at production level.
    // autoLoadEntities:true
  })
 
],
  controllers: [],
  providers: [],
})
export class AppModule {}
