import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Action2Service } from '../../../services/action2.service';
interface JobDetails {
  jobId: number;
  category: string;
  subcategory: string;
  task: string;
  status: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-customer-job-details',
  templateUrl: './customer-job-details.component.html'
})

export class CustomerJobDetailsComponent {

  private route = inject(ActivatedRoute);
  private ac = inject(Action2Service);

  jobDetails: JobDetails | null = null;
  loading = true;
  processing = false;
  error: string | null = null;

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.fetchJob(jobId);
  }

  fetchJob(jobId: number): void {
    this.loading = true;
    this.error = null;

    this.ac.post<ApiResponse<JobDetails>>({ relativeURL: '/authi/' })
      ('jobAction.jobDetails')({ jobId })
      .subscribe({
        next: res => {
          this.jobDetails = {
            ...res.data,
            jobId
          };
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load job details';
          this.loading = false;
        }
      });
  }

  markReady(): void {
    if (!this.jobDetails) return;

    this.processing = true;

    this.ac.post({ relativeURL: '/authi/' })
      ('jobAction.readyJob')({ jobId: this.jobDetails.jobId })
      .subscribe({
        next: () => {
          this.processing = false;
          this.fetchJob(this.jobDetails!.jobId);
        },
        error: () => {
          this.processing = false;
          this.error = 'Unable to confirm payment';
        }
      });
  }
}
