import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { BackendService } from './backend.service'

// Websocket Tunnel
import { QueueingSubject } from 'queueing-subject' // to ensure message is delivered
import websocketConnect from 'rxjs-websockets'
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private inputStream: QueueingSubject<string>
  public messages: Observable<string>

  constructor(private backendService: BackendService) {

  }

  connect() {
    if(this.messages){
      return this.messages
    }

    var listener = this.messages = websocketConnect(
      'ws://localhost:5555/',
      this.inputStream = new QueueingSubject<string>()
    ).messages

    console.log('connecting')

    listener.subscribe(
      this.backendService.getMyId().subscribe(data => {
        console.log(data)
        this.sendJSON({
          type: 'register',
          id: data.userId
        });
      })
    )

    return this.messages;
  }

  sendJSON(message: object):void {
    this.send(JSON.stringify(message));
  }

  send(message: string):void {
    this.inputStream.next(message)
  }

  private socket$: any;
}
