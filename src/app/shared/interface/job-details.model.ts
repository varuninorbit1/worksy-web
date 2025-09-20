// src/app/models/job-details.model.ts
export interface JobDetails {
  category: string;
  subcategory: string;
  task: string;
  slugs: {
    category: string;
    subcategory: string;
    task: string;
  };
}

export const DEFAULT_JOB_DETAILS: JobDetails = {
  category: '',
  subcategory: '',
  task: '',
  slugs: {
    category: '',
    subcategory: '',
    task: ''
  }
};
