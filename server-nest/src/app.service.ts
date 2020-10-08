import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  constructor(
   ) { }
  getHello(req?: Request) {
    // this.test();
    return `nest server run on ${process.env.PORT}\nstrapi server run on ${process.env.STRAPI_PORT}`;
  }
 
  async test() {
    // let res = await this.io.socket_io_emit('/game20', 'new_process', {
    //   game_id: 'dy1',
    // });
    // Logger.log(res, 'AppService');
  }
}
