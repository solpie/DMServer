import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
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
        if (!end_time)
            end_time = Infinity
        return await this.dmSrv.stat_user(room_id, Number(start_time), end_time)
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
    @Post('/dmcat/git-pull')
    async get_git_pull(@Query() query: any) {
        // req localhost:5555
        var request = require('requestretry');
        request({
            url: 'http://localhost:5555/git-pull',
            maxAttempts: 1,   // (default) try 5 times
            retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
        }, function (err, response, body) {
            // this callback will only be called when the request succeeded or after maxAttempts or on error
            if (response) {
                console.log('The number of request attempts: ' + response.attempts);
            }
        });
        return { msg: 'sus' }
    }
    @Get('/dmcat/git-log')
    async get_git_log() {
        const _txt = () => new Promise(resolve => {
            var fs = require("fs");
            fs.readFile("git-log.txt", 'utf-8', (err, data) => {
                if (err) throw err;
                console.log(data)
                resolve(data)
            });
        })
        return await _txt()
    }
    _j_url = 'http://192.168.1.252:8096'

    @Get('/dmcat/test')
    _test() {
        return { msg: "auto git pull on push to github..." }
    }

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

    @Delete('/dmcat/delete')
    async _delete_dm(@Body('dm_doc_arr') dm_doc_arr: any[]) {
        //
        let count = await this.dmSrv.remove_arr(dm_doc_arr)
        return { msg: 'sus', count }
    }

    @Get('/dmcat/start-stat')
    async _get_stat(@Query() query: any) {
        const { type } = query
        if (type) {
            return this.dmSrv.get_stat_type(type)
        }
        else
            return this.dmSrv.get_stat()
    }
}
