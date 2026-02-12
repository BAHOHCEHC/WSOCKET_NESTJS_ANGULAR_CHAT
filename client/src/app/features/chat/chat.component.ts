import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SocketService } from '../../core/services/socket.service';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageInputComponent } from './components/message-input/message-input.component';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MessageListComponent, MessageInputComponent],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    private socketService = inject(SocketService);
    private fb = inject(FormBuilder);

    public messages = this.socketService.messages;
    public isConnected = this.socketService.connected;
    public currentRoom = signal<string>('general');
    public currentUser = signal<string>('User_' + Math.floor(Math.random() * 1000));

    public roomForm = this.fb.group({
        room: ['general', [Validators.required]]
    });

    constructor() {
        this.socketService.joinRoom(this.currentRoom());
    }

    public onRoomChange(): void {
        if (this.roomForm.valid) {
            const newRoom = this.roomForm.value.room!;
            this.currentRoom.set(newRoom);
            this.socketService.joinRoom(newRoom);
        }
    }

    public onSendMessage(message: string): void {
        this.socketService.sendMessage(this.currentRoom(), this.currentUser(), message);
    }
}
