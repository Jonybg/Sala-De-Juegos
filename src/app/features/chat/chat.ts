import { Component, inject } from '@angular/core';
import { ChatService } from '../../core/services/chat/chat';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

  chatService = inject(ChatService)


  enviarMensaje(){
    this.chatService.enviar();
  }



}
