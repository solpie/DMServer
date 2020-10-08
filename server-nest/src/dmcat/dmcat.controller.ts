import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { Logger } from '@nestjs/common/services';
import { DmcatService } from './dmcat.service';

@Controller()
export class DmcatController {
    constructor(private dmSrv: DmcatService) { }
    @Post('/dmcat/create')
    create_dm(@Body() body: any) {
        const { msg_id, user_id, user_name, content, room_id } = body;
        this.dmSrv.create(body);
        return { msg: 'sus', user_name, content };
    }
    // '/content-manager/explorer/application::dm.dm'
    @Get('/dmcat/list')
    async get_dm(@Query() query: any) {
        return await this.dmSrv.find_by_strapi(query);
    }
    @Get('/content-manager/explorer/application**dm*dm/:count')
    async get_dm2(@Query() query: any, @Req() req: any) {
        // Logger.log(`/content-manager/explorer/application::dm.dm` + req.params);
        if (req.params['*'] === '::dm.dm/count') {
            let count = await this.dmSrv.count();
            return { count };
        } else {
            return await this.dmSrv.find_by_strapi(query);
        }
    }
    @Get('/dmcat/query')
    async get_dm_query(@Query() query: any) {
        let { like, start_time, end_time } = query
        // like  contain t  %t%
        // MoreThanOrEqual
        if (!end_time)
            end_time = Infinity
        return await this.dmSrv.find_like(like, Number(start_time), end_time)
    }
    @Get('/dmcat/count')
    async get_dm_count2(@Query() query: any) {
        let count = await this.dmSrv.count();
        return { count };
    }
}
