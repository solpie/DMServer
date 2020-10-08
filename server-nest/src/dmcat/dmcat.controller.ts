import { Query } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Logger } from '@nestjs/common/services';
import { DmcatService } from './dmcat.service';

@Controller()
export class DmcatController {
  constructor(private dmSrv: DmcatService) {}
  @Post('/dmcat/create')
  async create_dm(@Body() body: any) {
    const { msg_id, user_id, user_name, content, room_id } = body;
    this.dmSrv.create(body);
    return { msg: 'sus', user_name, content };
  }
  // '/content-manager/explorer/application::dm.dm'
  @Get('/dmcat/list')
  async get_dm(@Query() query: any) {
    return await this.dmSrv.find_by_strapi(query);
  }
  @Get('/content-manager/explorer/application**dm*dm')
  async get_dm2(@Query() query: any) {
    return await this.dmSrv.find_by_strapi(query);
  }
}
