import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { UserState } from '../../models/user.model';
import * as UserActions from '../../store/user.actions';
import { selectSearchResults, selectSearchLoading, selectLoading } from '../../store/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <div class="header-content">
        <div class="logo-section" (click)="navigateToHome()">
          <mat-icon>people</mat-icon>
          <span class="logo-text">User Dashboard</span>
        </div>

        <div class="search-section">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search by User ID</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="searchQuery"
              (input)="onSearchInput($event)"
              placeholder="Enter user ID..."
              min="1"
            >
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          @if (searchResults$ | async; as searchResult) {
            <div class="search-results">
              @if (searchResult) {
                <div class="search-result-item" (click)="navigateToUser(searchResult.id)">
                  <img [src]="searchResult.image" [alt]="searchResult.firstName + ' ' + searchResult.lastName" class="search-avatar">
                  <div class="search-user-info">
                    <span class="search-user-name">{{ searchResult.firstName }} {{ searchResult.lastName }}</span>
                    <span class="search-user-email">{{ searchResult.email }}</span>
                  </div>
                </div>
              } @else {
                <div class="search-no-results">
                  No user found with this ID
                </div>
              }
            </div>
          }
        </div>
      </div>

      @if ((loading$ | async) || (searchLoading$ | async)) {
        <mat-progress-bar mode="indeterminate" class="loading-bar"></mat-progress-bar>
      }
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      position: relative;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .logo-section:hover {
      opacity: 0.8;
    }

    .logo-text {
      margin-left: 8px;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .search-section {
      position: relative;
      min-width: 300px;
    }

    .search-field {
      width: 100%;
    }

    .search-field ::ng-deep .mat-mdc-form-field-flex {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .search-field ::ng-deep .mat-mdc-form-field-outline {
      color: rgba(255, 255, 255, 0.3);
    }

    .search-field ::ng-deep .mat-mdc-form-field-label {
      color: rgba(255, 255, 255, 0.7);
    }

    .search-field ::ng-deep .mat-mdc-input-element {
      color: white;
    }

    .search-field ::ng-deep .mat-icon {
      color: rgba(255, 255, 255, 0.7);
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    }

    .search-result-item {
      display: flex;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .search-result-item:hover {
      background-color: #f5f5f5;
    }

    .search-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
    }

    .search-user-info {
      display: flex;
      flex-direction: column;
    }

    .search-user-name {
      font-weight: 500;
      color: #333;
    }

    .search-user-email {
      font-size: 0.875rem;
      color: #666;
    }

    .search-no-results {
      padding: 12px;
      text-align: center;
      color: #666;
      font-style: italic;
    }

    .loading-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .search-section {
        width: 100%;
        min-width: unset;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery = signal('');
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  searchResults$;
  searchLoading$;
  loading$;

  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.searchResults$ = this.store.select(selectSearchResults);
    this.searchLoading$ = this.store.select(selectSearchLoading);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    // Set up debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      if (query && query.trim()) {
        const userId = parseInt(query.trim(), 10);
        if (!isNaN(userId) && userId > 0) {
          this.store.dispatch(UserActions.searchUser({ id: userId }));
        }
      } else {
        this.store.dispatch(UserActions.clearSearchResults());
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.searchQuery.set(value);
    this.searchSubject.next(value);
  }

  navigateToUser(userId: number) {
    this.router.navigate(['/user', userId]);
    this.store.dispatch(UserActions.clearSearchResults());
    this.searchQuery.set('');
  }

  navigateToHome() {
    this.router.navigate(['/']);
    this.store.dispatch(UserActions.clearSearchResults());
    this.searchQuery.set('');
  }
}
