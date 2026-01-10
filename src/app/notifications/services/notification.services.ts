import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action2Service } from '../../services/action2.service';

export interface NotificationItem {
  notif_id: number;
  message: string;
  status: 'read' | 'unread';
  created_at: string;
  context_type?: 'job' | 'chat' | 'payment' | 'feedback';
  context_id?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  private readonly ac = inject(Action2Service);

  private unreadCountSubject = new BehaviorSubject<number>(0);
  readonly unreadCount$ = this.unreadCountSubject.asObservable();

  private listSubject = new BehaviorSubject<NotificationItem[]>([]);
  readonly list$ = this.listSubject.asObservable();

  fetchUnreadCount(): void {
    this.ac
      .post<{ count: number }>({ keyval: true, relativeURL: '/authi/' })
      ('notificationAction.unreadCount')({})
      .subscribe({
        next: r => this.unreadCountSubject.next(r?.count ?? 0),
        error: () => this.unreadCountSubject.next(0)
      });
  }

  fetchList(): void {
    this.ac
      .post<NotificationItem[]>({ keyval: true, relativeURL: '/authi/' })
      ('notificationAction.list')({})
      .subscribe({
        next: list => this.listSubject.next(list ?? []),
        error: () => this.listSubject.next([])
      });
  }

  markRead(notifId: number): void {
    this.ac
      .post({ keyval: true, relativeURL: '/authi/' })
      ('notificationAction.markRead')({ notif_id: notifId })
      .subscribe(() => {
        // refresh both
        this.fetchList();
        this.fetchUnreadCount();
      });
  }
}
