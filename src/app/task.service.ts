import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './shared/task-card';
import { AppError, NotFoundError } from './shared/errors';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly url: string;

  constructor(private http: HttpClient) 
  { 
    this.url = 'http://localhost:3000/tasks';
  }

  public postTask(task): Observable<Task>
  {
    const now: Date = new Date();
    return this.http.post<Task>(this.url, { ...task, date: now.getTime() });
  }
  public getTasks(): Observable<Task[]> 
  { 
    return this.http.get<Task[]>(this.url);
  }
}
