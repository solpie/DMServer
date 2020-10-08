import { Body, Controller, Post } from '@nestjs/common';
import { DmcatService } from './dmcat.service';

@Controller('dmcat')
export class DmcatController {
    constructor(private dmSrv: DmcatService) { }
    @Post('/create')
    async post_game_doc(@Body() body: any) {
        const { msg_id, user_id, user_name, content, room_id } = body
        this.dmSrv.create(body)
        return { msg: 'sus', user_name, content };
    }
}
