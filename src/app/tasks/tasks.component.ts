import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../shared/task-card';
import { AppError, NotFoundError } from '../shared/errors';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit 
{
  public title: string = "Tasks";
  public tasks: Task[];
  public errorMsg: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() 
  {
    // estamos tristes por que no maneja el error 404 :( 
    this.taskService
    .getTasks()
    .subscribe((response:Task[]) => this.tasks = response)
  }
}
