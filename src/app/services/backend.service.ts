import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// Models
import {
  Login, LoginResponce, User, SuccessResponce, GetChatId,
  GetChatIdResponce, GetChatResponce, Message, GetChat,
} from './models';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  constructor(private http: HttpClient){
    console.log('Backend service constructed')
  }

  private httpOptionsJWT = {};

  isLogged = function(){
    var token = localStorage.getItem('someJWTToken');

    if(token){
      this.setJWT(token);
    }

    return token;
  }

  setJWT = function(token){
      this.httpOptionsJWT = {
        headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'X-authorization': token
       })
     };
  }

  setLogged = function(token){
    localStorage.setItem('someJWTToken', token);
    this.setJWT(token);
  }

  getMyId(): Observable<GetChatId>{
    return this.http.post<GetChatId>(url+'getMyId', {}, this.httpOptionsJWT).pipe();
  }

  login(login: Login): Observable<LoginResponce> {
    return this.http.post<LoginResponce>(url+'login', login, httpOptions).pipe();
  }

  register(register: Login): Observable<SuccessResponce> {
    return this.http.post<SuccessResponce>(url+'register', register, httpOptions).pipe();
  }

  getUsers(): Observable<User[]> {
    return this.http.post<User[]>(url+'getUsers', {}, this.httpOptionsJWT).pipe();
  }

  getChatId(chatId: GetChatId): Observable<GetChatIdResponce>{
    return this.http.post<GetChatIdResponce>(url+'getChatId/ByUserId', chatId, this.httpOptionsJWT).pipe();
  }

  getChat(chatId: GetChat): Observable<Message[]>{
    return this.http.post<Message[]>(url+'getChat', chatId, this.httpOptionsJWT).pipe();
  }

  pushMessage(node: Message): Observable<SuccessResponce>{
    return this.http.post<SuccessResponce>(url+'pushMessage', node, this.httpOptionsJWT).pipe();
  }

  getFile(node: getFile): Observable<SuccessResponce>{
    return this.http.post<SuccessResponce>(url+'getFile', node, this.httpOptionsJWT).pipe();
  }

  uploadFile(file): Observable<any>{
    return this.http.post<any>(url+'uploadFile', file, this.httpOptionsJWT).pipe();
  }
}
