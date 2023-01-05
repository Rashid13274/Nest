import { NestFactory } from '@nestjs/core';
import * as  session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { SessionEntity } from './Typeorm/Session';
import{Logger} from '@nestjs/common'
// import {  getConnection, getRepository } from 'typeorm';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  // const sessionRepository = getRepository(SessionEntity)
  // const sessionRepository = getConnection().manager.getRepository(SessionEntity);
  // app.use(session({
  //   name:'NESTJS_SESSION_ID',
  //   secret:'akjskjkkd',
  //   resave:false,
  //   saveUninitialized:false,
  //   // saveUninitialized:true,

  //   cookie:{
  //   maxAge:60000,
  //   },
  //   // store:new TypeormStore()
  //   })
  //   );
    // app.use(passport.initialize());
    // app.use(passport.session());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
