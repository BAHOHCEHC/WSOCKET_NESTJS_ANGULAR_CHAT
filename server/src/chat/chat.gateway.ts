import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) { }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);

    const history = await this.messageRepo.find({
      where: { room },
      order: { createdAt: 'ASC' },
    });

    client.emit('history', history);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { room: string; user: string; message: string },
  ) {
    const saved = await this.messageRepo.save({
      ...data,
      createdAt: new Date(),
    });

    this.server.to(data.room).emit('message', saved);
  }
}
