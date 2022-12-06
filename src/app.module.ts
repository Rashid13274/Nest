import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// import config from './users/config';

import config from './users/config/keys';



@Module({
  // imports: [],
  imports: [MongooseModule.forRoot(config.mongoURI), UsersModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
