import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationsService,
  NotificationItem
} from '../../services/notification.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
})
export class NotificationListComponent implements OnInit {

  private readonly notifications = inject(NotificationsService);
  private readonly router = inject(Router);

  list: NotificationItem[] = [];

  ngOnInit(): void {
    this.notifications.list$.subscribe(list => this.list = list);
    this.notifications.fetchList();
  }

  onClick(n: NotificationItem): void {
    if (n.status === 'unread') {
      this.notifications.markRead(n.notif_id);
    }

    switch (n.context_type) {
      case 'job':
        this.router.navigate(['/jobs', n.context_id]);
        break;

      case 'chat':
        this.router.navigate(['/jobs', n.context_id, 'chat']);
        break;

      case 'payment':
        this.router.navigate(['/payments', n.context_id]);
        break;

      case 'feedback':
        this.router.navigate(['/feedback', n.context_id]);
        break;

      default:
        // fallback: do nothing
        break;
    }
  }
}
