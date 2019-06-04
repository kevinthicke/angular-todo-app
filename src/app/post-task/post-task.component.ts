import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task-card/shared/task-card';

interface TaskFormInput {
  title: string,
  description: string
}

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styles: []
})
export class PostTaskComponent implements OnInit {
  public title: string = "Add a new Task";
  public taskForm: FormGroup;

  constructor(private taskService: TaskService) { 

  }

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

  public save() {
    this.taskService.getTasks().subscribe((response: Task[]) => {

      let taskIsUnique: boolean = response.filter((task: Task) => task.title == this.taskForm.value.title).length ? false: true;
      
      if(!taskIsUnique) {
        
        this.taskForm.setErrors({
          taskAlredyExists: true
        })
      } 
    })
  }

}
