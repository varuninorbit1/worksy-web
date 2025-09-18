import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { easyDebug } from '../decorator/easy-debug.decorator';
import { StoreService } from './services/store.service';

@easyDebug()
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('ngwork');
  store: Object;
  constructor(private storeSvc: StoreService) {
    this.store = this.storeSvc.createStore('t',localStorage)
   }
}
