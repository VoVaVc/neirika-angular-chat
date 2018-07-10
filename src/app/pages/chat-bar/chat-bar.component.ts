import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// services
import { BackendService } from '../../services/backend.service'
import { ChatService } from '../../services/chat.service'

import { GetChatId } from '../../services/models';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

  constructor(private backendService: BackendService,
    private route: ActivatedRoute,
    private chatService: ChatService){

  }

  users;
  currentUserChat: GetChatId = {
    userId: null
  };
  chatId: number = null;

  ngOnInit() {
    // enable routing to chat
    const id = +this.route.snapshot.paramMap.get('id');

    if(id){
      this.openChat(id)
    }

    this.backendService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => console.error(err)
    );



    this.enableBrowserNotifications();
  },

  openChat(userId){
    this.currentUserChat.userId = userId;

    this.backendService.getChatId(this.currentUserChat).subscribe(
      data => {
        this.chatId = data._id;
      },
      err => console.error(err)
    )
  }

  enableBrowserNotifications(){
    if (!Notification) {
      console.log('Notifications not supported');
      return;
    }

    if ((Notification as any).permission !== "granted"){ // that's why typescript is a tricky thing
      Notification.requestPermission();
    }
  },

  newChatRoom(){

  }
}
