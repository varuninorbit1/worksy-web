import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationsService,
  NotificationItem
} from '../../services/notification.services';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
})
export class NotificationListComponent implements OnInit {

  private readonly notifications = inject(NotificationsService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  list: NotificationItem[] = [];

  ngOnInit(): void {
    this.notifications.list$.subscribe(list => this.list = list);
    this.notifications.fetchList();
  }

  onClick(n: NotificationItem): void {
    if (n.status === 'unread') {
      this.notifications.markRead(n.notif_id);
    }

    const user = this.auth.me();
    if (!user) return;
    debugger;
    switch (n.context_type) {

      case 'job':
        this.navigateToJob(n.context_id!, user.role_id);
        break;

      case 'chat':
        this.navigateToJob(n.context_id!, user.role_id, 'chat');
        break;

      case 'payment':
        this.router.navigate(['/payments', n.context_id]);
        break;

      case 'feedback':
        this.router.navigate(['/feedback', n.context_id]);
        break;

      default:
        break;
    }
  }

  private navigateToJob(
    jobId: number,
    roleId: number,
    child?: string
  ): void {

    // role_id: 2 = customer, 3 = worker
    if (roleId === 2) {
      this.router.navigate(
        child
          ? ['/customer/jobs', jobId, child]
          : ['/customer/jobs', jobId]
      );
    }

    if (roleId === 3) {
      this.router.navigate(
        child
          ? ['/worker/jobs', jobId, child]
          : ['/worker/jobs', jobId]
      );
    }
  }
}
