import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './customers/config/keys'
@Module({
  imports: [CustomersModule,MongooseModule.forRoot(config.MongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
