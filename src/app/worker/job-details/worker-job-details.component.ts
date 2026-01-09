import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-job-details.component.html',
  styleUrls: ['./worker-job-details.component.css'],
})
export class WorkerJobDetailsComponent {
  constructor() {}
}
