import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Action2Service } from '../services/action2.service';
import { easyDebug } from '../../decorator/easy-debug.decorator';


interface Category { slug: string; name: string; subtitle: string; icon: string; img: string; }
interface Pro { id: number; name: string; trade: string; city: string; rating: number; price: number; img: string; }

@easyDebug()
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private ac : Action2Service) { }


  year = new Date().getFullYear();
  query = '';
  city = '';


  categories: Category[] = [
    { slug: 'electrician', name: 'Electrician', subtitle: 'Wiring, fans, lights', icon: 'bi bi-lightning-fill', img: 'services/electrician.png' },
    { slug: 'plumber', name: 'Plumber', subtitle: 'Leaks, fittings, RO', icon: 'bi bi-droplet', img: '/services/plumber.png' },
    { slug: 'carpenter', name: 'Carpenter', subtitle: 'Furniture & repairs', icon: 'bi bi-hammer', img:'services/carpenter.png' },
    { slug: 'painter', name: 'Painter', subtitle: 'Interior & exterior', icon: 'bi bi-brush', img:'services/painter.png' },
    { slug: 'ac-repair', name: 'AC Repair', subtitle: 'Service & gas top-up', icon: 'bi bi-snow', img:'services/ac-repair.png' },
    { slug: 'mason', name: 'Mason', subtitle: 'Construction & tiles', icon: 'bi bi-tools', img:'services/mason.png' },
    { slug: 'cleaning', name: 'Home Cleaning', subtitle: 'Deep clean, sofa, more', icon: 'bi bi-broom', img:'services/cleaning.png' },
    { slug: 'appliance', name: 'Appliances', subtitle: 'Fridge, washer, TV', icon: 'bi bi-tv', img:'services/appliance.png' }
  ];


  pros: Pro[] = [
    { id: 1, name: 'Rohit Verma', trade: 'Electrician', city: 'Noida', rating: 4.9, price: 499, img:'services/person/male.png' },
    { id: 2, name: 'Aisha Khan', trade: 'Plumber', city: 'Delhi', rating: 4.8, price: 549, img:'services/person/female.png' },
    { id: 3, name: 'Sanjay Patel', trade: 'Carpenter', city: 'Gurugram', rating: 4.7, price: 599, img:'services/person/male.png' },
    { id: 4, name: 'Meera Joshi', trade: 'Painter', city: 'Ghaziabad', rating: 4.9, price: 499, img:'services/person/female.png' },
    { id: 5, name: 'Arun Nair', trade: 'AC Repair', city: 'Faridabad', rating: 4.8, price: 649, img:'services/person/male.png' },
    { id: 6, name: 'Kamal Singh', trade: 'Mason', city: 'Noida', rating: 4.6, price: 699, img:'services/person/male.png' }
  ];


  onSearch(): void {
    // If you have /search route, navigate with params. Otherwise, just alert.
    try {
      const params = new URLSearchParams();
      if (this.query) params.set('q', this.query);
      if (this.city) params.set('city', this.city);
      this.router.navigateByUrl(`/search?${params.toString()}`);
    } catch {
      alert(`Searching for: ${this.query} in ${this.city || 'anywhere'}`);
    }
  }
}
