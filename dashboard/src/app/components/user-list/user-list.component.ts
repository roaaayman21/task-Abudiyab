import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../services/user.service';
import { HighlightDirective } from '../../directives/highlight.directive';
import { fadeInAnimation, scaleInAnimation } from '../../animations/fade-in.animation';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';

// This is the main page that shows all users in a nice grid
// It handles pagination, loading states, and makes everything look smooth
// Users can click on any card to see more details about that person
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HighlightDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  animations: [fadeInAnimation, scaleInAnimation]
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  totalUsers$: Observable<number>;

  private destroy$ = new Subject<void>();
  private usersPerPage = 12;
  private currentPage = 1;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.users$ = this.store.select(UserSelectors.selectUsers);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
    this.currentPage$ = this.store.select(UserSelectors.selectCurrentPage);
    this.totalPages$ = this.store.select(UserSelectors.selectTotalPages);
    this.totalUsers$ = this.store.select(UserSelectors.selectTotalUsers);
  }

  ngOnInit(): void {
    this.loadUsers();

    // Subscribe to current page changes
    this.currentPage$.pipe(takeUntil(this.destroy$)).subscribe(page => {
      this.currentPage = page;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers({
      page: this.currentPage,
      limit: this.usersPerPage
    }));
  }

  onUserClick(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  onPageChange(page: number): void {
    if (page >= 1) {
      this.store.dispatch(UserActions.loadUsers({
        page,
        limit: this.usersPerPage
      }));
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    this.totalPages$.pipe(takeUntil(this.destroy$)).subscribe(totalPages => {
      if (this.currentPage < totalPages) {
        this.onPageChange(this.currentPage + 1);
      }
    });
  }
}
