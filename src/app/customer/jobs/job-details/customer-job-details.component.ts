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

type JobStatus =
  | 'created'
  | 'accepted'
  | 'ready'
  | 'started'
  | 'ended';

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

  processing = false;
  actionError: string | null = null;


  private route = inject(ActivatedRoute);
  private ac = inject(Action2Service);

  jobDetails: JobDetails | null = null;
  loading = true;

  error: string | null = null;

  ngOnInit(): void {
    this.loadJobDetails();
  }

  loadJobDetails(): void {
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

  makePayment(): void {
    if (!this.jobDetails) return;

    this.processing = true;
    this.error = null;


    // .post({ keyval: true, relativeURL: '/authi/' })
    //   ('jobAction.jobDetails')
    this.ac.post({ keyval: true, relativeURL: '/authi/' })
      ('jobAction.readyJob')({
        jobId: this.jobDetails.jobId
      })
      .subscribe(r => {
        console.log(r);
      });

  }


endJob(): void {
  if (!this.jobDetails) return;

  this.processing = true;
  this.actionError = null;

  this.ac
    .post({ keyval: true, relativeURL: '/authi/' })
    ('jobAction.endJob')({ jobId: this.jobDetails.jobId })
    .subscribe({
      next: () => {
        this.processing = false;
        this.loadJobDetails(); // refresh state
      },
      error: () => {
        this.processing = false;
        this.actionError = 'Failed to end job';
      }
    });
}



}
