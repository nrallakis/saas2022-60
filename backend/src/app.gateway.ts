import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: any): any {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log('Client disconnected: ' + client.id);
  }
}
