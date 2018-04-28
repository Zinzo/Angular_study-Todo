import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {TodoVO} from "../domain/todo.vo";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ResultVO} from "../domain/result.vo";

@Component({
  selector    : 'app-angular',
  templateUrl : './angular.component.html',
  styleUrls   : ['./angular.component.scss'],
  animations  : [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('in => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(-50px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
        ]))
      ]),
    ])
  ]
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo = new TodoVO();
  tempTodoMap = new Map<number, TodoVO>();

  constructor( private userService:UserService) { }

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo() {
    this.userService.addTodo(this.newTodo)
      .subscribe(body => {
        console.log(body);
        // todoList 맨앞에 삽입
        this.todoList.unshift(body);
      })
  }

  // 할일 저장
  save(todo:TodoVO) {
    todo.isEdited = true;

    const tempTodo = Object.assign({},todo);
    this.tempTodoMap.set(tempTodo.todo_id, tempTodo);
  }

  // 할일 수정 취소
  restore(todo:TodoVO) {
    const tempTodo = this.tempTodoMap.get(todo.todo_id);
    todo = Object.assign(todo,tempTodo);

    todo.isEdited = false;
  }

  //할일 수정
  modify(todo: TodoVO){
    this.userService.modifyTodo(todo)
      .subscribe(body =>{
        Object.assign(todo,body);

        todo.isEdited = false;
      })
  }

  remove(todo_id:number, index:number){
    const result = confirm('삭제할래??');
    if(result){
      this.userService.removeTodo(todo_id)
        .subscribe(body =>{
          if(body.result == 0){
            this.todoList.splice(index,1);
          }
        });
    }
  }
}
