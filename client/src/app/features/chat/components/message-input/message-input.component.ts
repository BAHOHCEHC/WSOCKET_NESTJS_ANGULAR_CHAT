import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
    private fb = inject(FormBuilder);
    public send = output<string>();

    public messageForm = this.fb.group({
        message: ['', [Validators.required]]
    });

    public onSend(): void {
        if (this.messageForm.valid) {
            const msg = this.messageForm.value.message!;
            this.send.emit(msg);
            this.messageForm.reset();
        }
    }
}
