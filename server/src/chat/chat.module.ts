import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatGateway],
})
export class ChatModule { }
