import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service'
import { ChatService } from '../../../services/chat.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { Message } from '../../../services/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chatId: number;
  @Input() userId: number;
  fileDrop: boolean;
  message: string;
  messages: Array<Message>;

  constructor(private backendService: BackendService, private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect().subscribe((message: string) => {
      // socket can maintain different actions, so bind it to type = message
      var message = JSON.parse(message);

      if(message.type == 'message'){
        this.newChatMessage(message);
      }
    });

    this.getChatMessages();
  }

  newChatMessage(message){
    if(!document.hasFocus()){
      // tab is inactive, push message
      var notification = new Notification(message.name, {
        icon: 'https://www.digitalcrafts.com/sites/default/files/django.png',
        body: message.message,
      });

      notification.onclick = function () {
        // implement routing to specific chat in future
        window.open(window.location.href+'/main/'+message.pd.chatId);
      };
    }

    this.getChatMessages();
  }

  getChatMessages(){
    this.backendService.getChat({
      chatId: this.chatId
    }).subscribe(
      data => {
        this.messages = data;
      },
      err => console.error(err)
    );
  }

  sendMessage(){
    this.backendService.pushMessage({
      chatId: this.chatId,
      message: this.message
    }).subscribe(
      data => this.getChatMessages(),
      err => console.error(err)
    )
  }

  buildDateTime(datetime){
    var dateObject = new Date(datetime),
        date    = setZeros(dateObject.getDate()),
        month   = setZeros(dateObject.getMonth()),
        year    = dateObject.getFullYear(),
        hours   = setZeros(dateObject.getHours()),
        minutes = setZeros(dateObject.getMinutes());

    function setZeros(item){
      return item < 10 ? '0'+item : item
    };

    return date+'.'+month+'.'+year+' '+hours+':'+minutes;
  },

  dropped(event: UploadEvent) {
    var files = event.files;
    this.fileDrop = false

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(file)
          const formData = new FormData()
          formData.append('file', file, droppedFile.relativePath)

          this.backendService.uploadFile(formData).subscribe(data => {
            console.log('got it')
            // Sanitized logo returned from backend
          })

          // var reader = new FileReader();
          //
          // reader.addEventListener('load', (event) => {
          //   this.backendService.pushMessage({
          //     chatId: this.chatId,
          //     message: event.target.result,
          //     file: true
          //   }).subscribe(
          //     data => this.getChatMessages(),
          //     err => console.error(err)
          //   )
          // });
          //
          // reader.readAsText(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  getFile(datetime){
    this.backendService.getFile({
      chatId: this.chatId,
      datetime: datetime,
    }).subscribe(
      data => console.log(data),
      err => console.error(err)
    )
  }

  onFileDrag(){
    console.log('file draggin');
    this.fileDrop = true
  }

  onFileLeave(){
    console.log('file leave');
    this.fileDrop = false
  }
}
