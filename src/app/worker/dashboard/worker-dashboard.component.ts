import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-dashboard.component.html',
  //styleUrls: ['./worker-dashboard.component.css'],
})
export class WorkerDashboardComponent {
  constructor() {}
}
