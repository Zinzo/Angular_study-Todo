import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {TodoVO} from "./domain/todo.vo";

@Injectable()
export class UserService {
  private headers : HttpHeaders;
  constructor( private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type" : 'application/json'
    })
  }

  getTodoList():Observable<TodoVO[]> {
    return this.http.get<TodoVO[]>('http://www.javabrain.kr:8080/api/todo');
  }

  addTodo(params: TodoVO){
    return this.http.post('http://www.javabrain.kr:8080/api/todo',params,{headers:this.headers})
  }
}
