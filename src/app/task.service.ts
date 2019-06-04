import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task-card/shared/task-card';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/tasks';
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

}
