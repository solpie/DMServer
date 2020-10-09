import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ path: '/', namespace: '/dmcat' })
export class DmcatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    Logger.log('/dmcat.io ws connected', "dmcat.io")
    client.join('dmcat')
    // this.server.of('dmcat').emit('echo', 'hello ')
    this.server.emit('echo', 'test')
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

}
