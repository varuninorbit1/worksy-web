import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Action2Service } from '../../services/action2.service';

type JobStatus =
  | 'created'
  | 'accepted'
  | 'ready'
  | 'started'
  | 'ended';

interface WorkerJobDetails {
  category: string;
  subcategory: string;
  task: string;
  status: JobStatus;
}

interface JobDetailsApiResponse {
  message: string;
  data: WorkerJobDetails;
}


@Component({
  selector: 'app-worker-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-job-details.component.html'
})
export class WorkerJobDetailsComponent {
  jobId!: number;
  jobDetails: WorkerJobDetails | null = null;
  loading = true;
  error: string | null = null;
  processing = false;

  accepting = false;
  acceptError: string | null = null;
  acceptSuccess: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private ac: Action2Service
  ) { }

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    console.log('Job ID from route:', this.jobId);

    this.loadJobDetails();
  }
  loadJobDetails() {
    this.loading = true;
    this.error = null;

    this.ac
      .post({ keyval: true, relativeURL: '/authi/' })
      ('jobAction.jobDetails')
      ({ jobId: this.jobId })
      .subscribe({
        next: (res: any) => {
          const apiRes = res as JobDetailsApiResponse;
          //res = {category: 'plumber', subcategory: 'tap-faucet', task: 'tap-repair'}
          //it is not having job status in response?
          console.log('Job details loaded:', apiRes.data);

          this.jobDetails = apiRes.data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error loading job details:', err);
          this.error = 'Failed to load job details';
          this.loading = false;
        }
      });
  }

  acceptJob() {
    alert('Accept Job clicked');
    if (!this.jobId) return;

    this.accepting = true;
    this.acceptError = null;
    this.acceptSuccess = null;

    this.ac
      .post({ keyval: true, relativeURL: '/authi/' })
      ('jobAction.acceptJob')
      ({ jobId: this.jobId })
      .subscribe({
        next: (res: any) => {
          console.log('Job accepted:', res);

          this.acceptSuccess = 'Job accepted successfully';
          this.accepting = false;

          // Optional: update local job status immediately
          if (this.jobDetails) {
            (this.jobDetails as any).status = 'accepted';
          }
        },
        error: (err: any) => {
          console.error('Error accepting job:', err);

          this.acceptError = 'Failed to accept job';
          this.accepting = false;
        }
      });
  }

  startJob(): void {
    if (!this.jobId) return;

    this.processing = true;
    this.error = null;

    this.ac
      .post({ keyval: true, relativeURL: '/authi/' })
      ('jobAction.startJob')({ jobId: this.jobId })
      .subscribe({
        next: () => {
          this.processing = false;
          this.loadJobDetails(); // refresh job state
        },
        error: () => {
          this.processing = false;
          this.error = 'Failed to start job';
        }
      });
  }


}


