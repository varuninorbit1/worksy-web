// job-choice.component.ts
import { Component, computed, signal } from '@angular/core';
import { JobHierarchyService } from '../../services/job-hierarchy.service';
import { WorksyCategory, WorksySubcategory, WorksyTask } from '../../shared/interface/job-hierarchy.interface';
import { CommonModule } from '@angular/common';
import { easyDebug } from '../../../decorator/easy-debug.decorator';
import { JobDetailsComponent } from "../job-details/job-details.component";
import { DEFAULT_JOB_DETAILS, JobDetails } from '../../shared/interface/job-details.model';

@easyDebug()
@Component({
  selector: 'app-job-choice',
  templateUrl: './job-choice.component.html',
  styleUrls: ['./job-choice.component.scss'],
  imports: [CommonModule, JobDetailsComponent]
})
export class JobChoiceComponent {
  categories: typeof this.svc.categoriesSignal;

  selectedCategory = signal<WorksyCategory | null>(null);
  selectedSubcategory = signal<WorksySubcategory | null>(null);
  selectedTask = signal<WorksyTask | null>(null);

  subcategories = computed<WorksySubcategory[]>(
    () => this.selectedCategory()?.subcategories ?? []
  );
  tasks = computed<WorksyTask[]>(
    () => this.selectedSubcategory()?.tasks ?? []
  );

  jobDetails: JobDetails

  constructor(private svc: JobHierarchyService) {
    this.categories = this.svc.categoriesSignal;
    this.jobDetails = DEFAULT_JOB_DETAILS;
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const cat = this.categories().find(c => (c.slug ?? c.category) === value) ?? null;
    this.selectedCategory.set(cat);
    this.selectedSubcategory.set(null);
    this.selectedTask.set(null);
  }

  onSubcategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const sub = this.subcategories().find(s => (s.slug ?? s.name) === value) ?? null;
    this.selectedSubcategory.set(sub);
    this.selectedTask.set(null);
  }

  onTaskChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const task = this.tasks().find(t => (t.slug ?? t.name) === value) ?? null;
    this.selectedTask.set(task);
    // if (task) this.selectedJob(task); // logs final selection
  }

  // ✅ Success criteria: called at the end, logs structured payload
  selectedJob(job: WorksyTask) {
    this.jobDetails = {
        category: this.selectedCategory()?.category||'',
        subcategory: this.selectedSubcategory()?.name||'',
        task: job.name,
        id: String(this.selectedTask()?.id || '0'),
        state: 'created',
        slugs: {
          category: this.selectedCategory()?.slug ||'',
          subcategory: this.selectedSubcategory()?.slug ||'',
          task: job?.slug||''
        }
      }
  }
}
