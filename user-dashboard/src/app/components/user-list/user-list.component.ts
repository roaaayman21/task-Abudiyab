import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { UserState, User } from '../../models/user.model';
import { UserCardComponent } from '../user-card/user-card.component';
import { LoadingComponent } from '../loading/loading.component';
import * as UserActions from '../../store/user.actions';
import {
  selectUsers,
  selectLoading,
  selectError,
  selectPaginationInfo
} from '../../store/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    UserCardComponent,
    LoadingComponent
  ],
  template: `
    <div class="user-list-container">
      <div class="header-section">
        <h1>User Dashboard</h1>
        <p>Discover and explore user profiles</p>
      </div>

      @if (loading$ | async) {
        <app-loading message="Loading users..." [diameter]="60"></app-loading>
      } @else if (error$ | async) {
        <div class="error-container">
          <mat-icon color="warn">error</mat-icon>
          <h3>Error Loading Users</h3>
          <p>{{ error$ | async }}</p>
          <button mat-raised-button color="primary" (click)="retryLoad()">
            <mat-icon>refresh</mat-icon>
            Retry
          </button>
        </div>
      } @else {
        <div class="users-grid">
          @for (user of users$ | async; track user.id) {
            <app-user-card
              [user]="user"
              (cardClick)="onUserClick($event)"
              (viewDetails)="onViewDetails($event)">
            </app-user-card>
          } @empty {
            <div class="empty-state">
              <mat-icon>people_outline</mat-icon>
              <h3>No Users Found</h3>
              <p>There are no users to display at the moment.</p>
            </div>
          }
        </div>

        @if (paginationInfo$ | async; as pagination) {
          <div class="pagination-container">
            <mat-paginator
              [length]="pagination.totalUsers"
              [pageSize]="pagination.usersPerPage"
              [pageIndex]="pagination.currentPage - 1"
              [pageSizeOptions]="[5, 10, 20, 50]"
              [showFirstLastButtons]="true"
              (page)="onPageChange($event)"
              aria-label="Select page of users">
            </mat-paginator>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .user-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .header-section {
      text-align: center;
      margin-bottom: 32px;
      padding: 24px 0;
    }

    .header-section h1 {
      font-size: 2.5rem;
      font-weight: 300;
      margin-bottom: 8px;
      color: #333;
    }

    .header-section p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
      justify-items: center;
    }

    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 32px;
      padding: 16px 0;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      min-height: 300px;
    }

    .error-container mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .error-container h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .error-container p {
      margin: 0 0 24px 0;
      color: #666;
      max-width: 400px;
    }

    .empty-state {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      min-height: 300px;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      color: #ccc;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #666;
    }

    .empty-state p {
      margin: 0;
      color: #999;
    }

    @media (max-width: 768px) {
      .header-section h1 {
        font-size: 2rem;
      }

      .header-section p {
        font-size: 1rem;
      }

      .users-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .user-list-container {
        padding: 0 8px;
      }
    }

    @media (max-width: 480px) {
      .header-section {
        margin-bottom: 24px;
        padding: 16px 0;
      }

      .header-section h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  users$;
  loading$;
  error$;
  paginationInfo$;

  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.paginationInfo$ = this.store.select(selectPaginationInfo);
  }

  ngOnInit() {
    // Load initial users
    this.loadUsers(1);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserClick(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  onViewDetails(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  onPageChange(event: PageEvent) {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.loadUsers(page, limit);
  }

  retryLoad() {
    this.loadUsers(1);
  }

  private loadUsers(page: number, limit: number = 10) {
    const skip = (page - 1) * limit;
    this.store.dispatch(UserActions.setCurrentPage({ page }));
    this.store.dispatch(UserActions.loadUsers({ limit, skip }));
  }
}
