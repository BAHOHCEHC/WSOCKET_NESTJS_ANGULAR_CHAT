import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column()
  user: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;
}
