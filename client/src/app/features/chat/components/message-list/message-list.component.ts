import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../../../core/services/socket.service';

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-list.component.html',
    styleUrl: './message-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
    public messages = input.required<ChatMessage[]>();
}
