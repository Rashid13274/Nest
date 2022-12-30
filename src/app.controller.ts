import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  newAppService: any;
  constructor(private readonly appService: AppService) {}

  @Get('sheet')
  getExcel(){
    // return this.appService.getHello();
    // return this.appService.excel();
    // return this.appService.newExcel();
    // return this.newAppService.createExceljs();
    // return this.appService.exceljsFn()newExcejsFn;
    return this.appService.newExcejsFn();
  }
}
