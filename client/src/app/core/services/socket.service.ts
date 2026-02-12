import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
    id?: number;
    room: string;
    user: string;
    message: string;
    createdAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    public connected = signal<boolean>(false);
    public messages = signal<ChatMessage[]>([]);

    constructor() {
        this.socket = io('http://192.168.0.198:3000');

        this.socket.on('connect', () => {
            this.connected.set(true);
            console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            this.connected.set(false);
            console.log('Disconnected from WebSocket server');
        });

        this.socket.on('history', (history: ChatMessage[]) => {
            this.messages.set(history);
        });

        this.socket.on('message', (message: ChatMessage) => {
            this.messages.update(msgs => [...msgs, message]);
        });
    }

    public joinRoom(room: string): void {
        this.socket.emit('join', room);
    }

    public sendMessage(room: string, user: string, message: string): void {
        this.socket.emit('message', { room, user, message });
    }
}
