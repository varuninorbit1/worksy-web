import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Action2Service } from '../../services/action2.service';
type JobStatus = 'pending' | 'accepted' | 'completed';

interface WorkerJob {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  status: JobStatus;
  slugs: string;
}

interface JobListApiResponse {
  message: string;
  data: WorkerJob[];
}

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css'],
})
export class WorkerDashboardComponent implements OnInit {

  loading = true;
  error: string | null = null;


  constructor(private router: Router, private ac: Action2Service) { }

  jobs: WorkerJob[] = [
    {
      id: 0,
      title: '',
      category: '',
      subcategory: '',
      status: 'pending',
      slugs: ''
    }];

  selectedCategory = '';
  selectedStatuses: JobStatus[] = ['pending', 'accepted', 'completed'];

  ngOnInit() {
    this.loadJobs();
  }

  get filteredJobs() {
    return this.jobs.filter(j =>
      (!this.selectedCategory || j.category === this.selectedCategory) &&
      this.selectedStatuses.includes(j.status)
    );
  }

  openJob(jobId: number) {
    this.router.navigate(['/worker/jobs', jobId]);
  }

  loadJobs() {
    this.loading = true;
    this.error = null;

    this.ac.post({ keyval: true, relativeURL: '/authi/' })
      ('jobAction.workerJobs')
      ('')
      .subscribe({
        next: (res: any) => {
          const apiRes = res as JobListApiResponse;

          console.log('Jobs loaded:', apiRes.data);

          this.jobs = apiRes.data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error loading jobs:', err);
          this.error = 'Failed to load jobs';
          this.loading = false;
        }
      });
  }
}


