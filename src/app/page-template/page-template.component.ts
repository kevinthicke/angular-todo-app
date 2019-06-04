import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styles: [],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1}))
      ])
    ])
  ]
})
export class PageTemplateComponent {
  @Input() title: string;

}
