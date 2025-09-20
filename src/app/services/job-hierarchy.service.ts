// job-hierarchy.service.ts
import { Injectable, signal } from '@angular/core';
import { WorksyCategory } from '../shared/interface/job-hierarchy.interface';

@Injectable({ providedIn: 'root' })
export class JobHierarchyService {
  // Hardcoded for now; swap with HTTP later
  private readonly data: WorksyCategory[] = [
    {
      category: 'Cleaning Services',
      slug: 'cleaning-services',
      subcategories: [
        {
          name: 'Outdoor Cleaning',
          slug: 'outdoor-cleaning',
          tasks: [
            { name: 'Water Tank Cleaning', slug: 'water-tank-cleaning' },
            { name: 'Terrace / Roof Cleaning', slug: 'terrace-roof-cleaning' }
          ]
        }
      ]
    },
    {
      category: 'Plumber',
      slug: 'plumber',
      subcategories: [
        {
          name: 'Tap & Faucet',
          slug: 'tap-faucet',
          tasks: [
            { name: 'Tap Repair', slug: 'tap-repair' },
            { name: 'Tap Replacement', slug: 'tap-replacement' }
          ]
        }
      ]
    }
  ];

  categoriesSignal = signal<WorksyCategory[]>(this.data);
}
