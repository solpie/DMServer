import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Req, Res } from '@nestjs/common/decorators/http/route-params.decorator';
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
    @Get('/dmcat/user')
    async get_dm_user(@Query() query: any) {
        let { room_id, start_time, end_time } = query
        return await this.dmSrv.stat_user(room_id, Number(start_time), Number(end_time))
    }
    @Post('/dmcat/query')
    async post_dm_query(@Body() query: any) {
        let { like, start_time, end_time, room_id } = query
        // like  contain t  %t%
        // MoreThanOrEqual
        if (!end_time)
            end_time = Infinity
        // if (!room_id)
        //     room_id = 0
        return await this.dmSrv.find_like(like, Number(start_time), end_time, room_id)
    }
    @Get('/dmcat/count')
    async get_dm_count2(@Query() query: any) {
        let count = await this.dmSrv.count();
        return { count };
    }
    _j_url = 'http://192.168.1.252:8096'
    @Get('/dmcat/j')
    _j(@Res() res) {
        res.status(302).redirect(this._j_url);
    }
    @Post('/dmcat/j')
    _j1(@Body() body) {
        this._j_url = body['url']
        return { url: this._j_url }
    }

    @Post('/dmcat/start-stat')
    async _start_stat(@Req() req: Request) {
        let res = await this.dmSrv.start_stat(req.body)
        return { msg: 'sus', ...res }
    }

    @Get('/dmcat/start-stat')
    async _get_stat() {
        return this.dmSrv.get_stat()
    }
}
