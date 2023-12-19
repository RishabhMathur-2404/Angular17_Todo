import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  taskObj: Task;
  taskList: Task[] = [];
  originalTaskList:Task[] = [];
  tagsList: string[] = ['Work', 'Market', 'Health', 'Meeting'];
  filterType: string ='';
  selectedTag: string='';
  constructor() {
    this.taskObj= new Task()

    const localData = localStorage.getItem('TodoApp');
    if(localData != null) {
      this.taskList = JSON.parse(localData);
    }
  }

                                                   //setting filters for each button
  setFilter(type: string){
    this.filterType = type;
    this.selectedTag = '';
    if(this.filterType == 'showCompleted'){
      this.taskList = this.originalTaskList.filter(m=>m.isCompleted == true);
    }else{
      this.taskList = this.originalTaskList;
    }
  }


                                                     //filter tag function for sorting data as per choosen tag
  filterTag(tagName: string){
    this.selectedTag = tagName;
    console.log(this.originalTaskList);

    const filterData =  this.originalTaskList.filter((item)=>{

      // console.log(item);
      // const copytags = item.tags?.split(',') || []
      // console.log('copytags',copytags);
      // console.log(copytags.includes(tagName));
      // return copytags.includes(tagName)

      console.log(item.tags?.trim().includes(tagName));
      return item.tags?.trim().includes(tagName)
      });
      this.taskList = filterData;
  }


                                                        //newTask function to push new data
  newTask() {
    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);
    this.taskList.push(parseTask);
    this.originalTaskList = this.taskList;
    localStorage.setItem('TodoApp' , JSON.stringify(this.taskList));
  }


                                                         //onCompleted to show the completed tasks
  onComplete() {
    this.originalTaskList = this.taskList;
    localStorage.setItem('TodoApp' , JSON.stringify(this.taskList));
  }


                                                         //onRemove to remove tasks
  onRemove(index:number) {
    this.taskList.slice(index,1);
    this.originalTaskList = this.taskList;
    localStorage.setItem('TodoApp' , JSON.stringify(this.taskList));
  }


                                                         //getSepArr to split tags
  getSepArr(value: string) : string[] {
    const arr = value.split(',')
    return arr
  }

                                       //objects
}
export class Task{
  taskName : string;
  dueDate : string;
  tags : string
  isCompleted : boolean;
  constructor(){
    this.taskName="";
    this.dueDate='';
    this.tags='';
    this.isCompleted=false;
  }
}
