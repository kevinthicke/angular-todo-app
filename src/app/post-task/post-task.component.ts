import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../shared/task-card';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

interface TaskFormInput {
  title: string,
  description: string
}

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styles: [],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PostTaskComponent implements OnInit {
  public title: string = "Add a new Task";
  public taskForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]),
      description: new FormControl('', Validators.required)
    })
  }

  private taskFormIsUnique(tasks: Task[]): boolean 
  {
    return tasks.filter((task: Task) => task.title == this.taskForm.value.title).length ? false : true;
  }

  public save(): void | null 
  {
    this.taskService
      .getTasks().
      subscribe((response: Task[]) => 
      {
        if (!this.taskFormIsUnique(response))
          return this.taskForm.setErrors({ taskAlredyExists: true });
      })

    this.taskService
      .postTask(this.taskForm.value)
      .subscribe(response => this.router.navigate(['/tasks']));
  }

}
