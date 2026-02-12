import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Message } from './chat/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',   // важливо: це ім'я сервісу в docker
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'chat',
      entities: [Message],
      synchronize: true, // тільки для dev!
    }),
    ChatModule,
  ],
})
export class AppModule { }
