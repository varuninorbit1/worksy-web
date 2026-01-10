import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationsService,
  NotificationItem
} from '../../services/notification.services';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
})
export class NotificationListComponent implements OnInit {

  private readonly notifications = inject(NotificationsService);

  list: NotificationItem[] = [];

  ngOnInit(): void {
    this.notifications.list$.subscribe((list: NotificationItem[]) => {
      this.list = list;
    });

    this.notifications.fetchList();
  }

  markRead(n: NotificationItem): void {
    if (n.status === 'unread') {
      this.notifications.markRead(n.notif_id);
    }
  }
}
