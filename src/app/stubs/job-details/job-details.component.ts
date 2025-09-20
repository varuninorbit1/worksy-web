import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetails, DEFAULT_JOB_DETAILS } from '../../shared/interface/job-details.model';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm p-3">
      <h5 class="card-title mb-3">Job Details</h5>
      <ul class="list-unstyled">
        <li><strong>Category:</strong> {{ jobDetails.category }}</li>
        <li><strong>Subcategory:</strong> {{ jobDetails.subcategory }}</li>
        <li><strong>Task:</strong> {{ jobDetails.task }}</li>
        <li><strong>Task ID</strong> {{ jobDetails.id }}</li>
      </ul>

      <div class="mt-3">
        <h6>Slugs</h6>
        <ul class="list-unstyled small text-muted">
          <li><strong>Category:</strong> {{ jobDetails.slugs.category }}</li>
          <li><strong>Subcategory:</strong> {{ jobDetails.slugs.subcategory }}</li>
          <li><strong>Task:</strong> {{ jobDetails.slugs.task }}</li>
        </ul>
      </div>
    </div>
  `
})
export class JobDetailsComponent {
  @Input() jobDetails: JobDetails = DEFAULT_JOB_DETAILS;
}
