import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/interface/user.interface';
import { NotificationsService } from '../notifications/services/notification.services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  protected readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationsService);


  user: User | null = null;

  // TEMP: will come from NotificationsService later
  notificationCount = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.notifications.fetchUnreadCount();
      }
    });

    this.notifications.unreadCount$.subscribe(count => {
    this.notificationCount = count;
  });
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
