// ==========================
// File: src/app/home/home.component.ts
// ==========================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchForm = new FormGroup({
    q: new FormControl<string>('', { nonNullable: true }),
    location: new FormControl<string>('', { nonNullable: true })
  });

  categories = [
    { key: 'plumber', name: 'Plumber', icon: '🛠️' },
    { key: 'electrician', name: 'Electrician', icon: '💡' },
    { key: 'carpenter', name: 'Carpenter', icon: '🪚' },
    { key: 'painter', name: 'Painter', icon: '🎨' },
    { key: 'mason', name: 'Mason', icon: '🧱' },
    { key: 'ac', name: 'AC Repair', icon: '❄️' },
    { key: 'gardener', name: 'Gardener', icon: '🌿' },
    { key: 'driver', name: 'Driver', icon: '🚗' },
  ];

  featuredWorkers = [
    { id: 1, name: 'Rakesh Kumar', skill: 'Electrician', rating: 4.8, jobs: 124, location: 'Noida', price: 499, img: 'assets/workers/w1.jpg' },
    { id: 2, name: 'Seema Devi', skill: 'Plumber', rating: 4.6, jobs: 98, location: 'Delhi', price: 399, img: 'assets/workers/w2.jpg' },
    { id: 3, name: 'Imran Ali', skill: 'Carpenter', rating: 4.9, jobs: 152, location: 'Gurugram', price: 549, img: 'assets/workers/w3.jpg' },
    { id: 4, name: 'Priya Sharma', skill: 'Painter', rating: 4.7, jobs: 88, location: 'Ghaziabad', price: 449, img: 'assets/workers/w4.jpg' }
  ];

  testimonials = [
    { name: 'Amit', text: 'Found a great carpenter in minutes. Smooth experience!', location: 'Ghaziabad' },
    { name: 'Priya', text: 'Verified profiles gave me confidence to hire.', location: 'Gurugram' },
    { name: 'Rahul', text: 'Transparent pricing & quick scheduling.', location: 'Noida' },
  ];

  onSearch() {
    const { q, location } = this.searchForm.value;
    // TODO: Replace with router navigation to /search and include query params
    console.log('Search', q, location);
  }
}