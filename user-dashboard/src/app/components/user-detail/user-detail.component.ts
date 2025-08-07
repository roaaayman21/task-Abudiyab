import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { UserState, User } from '../../models/user.model';
import { LoadingComponent } from '../loading/loading.component';
import * as UserActions from '../../store/user.actions';
import { selectSelectedUser, selectLoading, selectError } from '../../store/user.selectors';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    LoadingComponent
  ],
  template: `
    <div class="user-detail-container">
      <div class="back-button-container">
        <button mat-raised-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Users
        </button>
      </div>

      @if (loading$ | async) {
        <app-loading message="Loading user details..." [diameter]="60"></app-loading>
      } @else if (error$ | async) {
        <div class="error-container">
          <mat-icon color="warn">error</mat-icon>
          <h3>Error Loading User</h3>
          <p>{{ error$ | async }}</p>
          <button mat-raised-button color="primary" (click)="retryLoad()">
            <mat-icon>refresh</mat-icon>
            Retry
          </button>
        </div>
      } @else {
        @if (user$ | async; as user) {
        <div class="user-detail-content">
          <mat-card class="user-profile-card">
            <mat-card-header>
              <div mat-card-avatar class="user-avatar">
                <img [src]="user.image" [alt]="user.firstName + ' ' + user.lastName" />
              </div>
              <mat-card-title>{{ user.firstName }} {{ user.lastName }}</mat-card-title>
              <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <div class="user-details-grid">
                <div class="detail-section">
                  <h3><mat-icon>person</mat-icon> Personal Information</h3>
                  <div class="detail-item">
                    <strong>Username:</strong> {{ user.username }}
                  </div>
                  <div class="detail-item">
                    <strong>Birth Date:</strong> {{ user.birthDate | date }}
                  </div>
                  <div class="detail-item">
                    <strong>Blood Group:</strong> {{ user.bloodGroup }}
                  </div>
                  <div class="detail-item">
                    <strong>Height:</strong> {{ user.height }} cm
                  </div>
                  <div class="detail-item">
                    <strong>Weight:</strong> {{ user.weight }} kg
                  </div>
                  <div class="detail-item">
                    <strong>Eye Color:</strong> {{ user.eyeColor }}
                  </div>
                  <div class="detail-item">
                    <strong>Hair:</strong> {{ user.hair.color }} ({{ user.hair.type }})
                  </div>
                </div>

                <div class="detail-section">
                  <h3><mat-icon>contact_phone</mat-icon> Contact Information</h3>
                  <div class="detail-item">
                    <strong>Phone:</strong> {{ user.phone }}
                  </div>
                  <div class="detail-item">
                    <strong>Email:</strong> {{ user.email }}
                  </div>
                  <div class="detail-item">
                    <strong>IP Address:</strong> {{ user.ip }}
                  </div>
                  <div class="detail-item">
                    <strong>MAC Address:</strong> {{ user.macAddress }}
                  </div>
                </div>

                <div class="detail-section">
                  <h3><mat-icon>location_on</mat-icon> Address</h3>
                  <div class="detail-item">
                    <strong>Street:</strong> {{ user.address.address }}
                  </div>
                  <div class="detail-item">
                    <strong>City:</strong> {{ user.address.city }}
                  </div>
                  <div class="detail-item">
                    <strong>State:</strong> {{ user.address.state }} ({{ user.address.stateCode }})
                  </div>
                  <div class="detail-item">
                    <strong>Postal Code:</strong> {{ user.address.postalCode }}
                  </div>
                  <div class="detail-item">
                    <strong>Country:</strong> {{ user.address.country }}
                  </div>
                  <div class="detail-item">
                    <strong>Coordinates:</strong> {{ user.address.coordinates.lat }}, {{ user.address.coordinates.lng }}
                  </div>
                </div>

                <div class="detail-section">
                  <h3><mat-icon>business</mat-icon> Company Information</h3>
                  <div class="detail-item">
                    <strong>Company:</strong> {{ user.company.name }}
                  </div>
                  <div class="detail-item">
                    <strong>Department:</strong> {{ user.company.department }}
                  </div>
                  <div class="detail-item">
                    <strong>Title:</strong> {{ user.company.title }}
                  </div>
                  <div class="detail-item">
                    <strong>University:</strong> {{ user.university }}
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
        }
      }
    </div>
  `,
  styles: [`
    .user-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .back-button-container {
      margin-bottom: 24px;
    }

    .user-profile-card {
      margin-bottom: 24px;
    }

    .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 16px;
    }

    .detail-section {
      background: #f9f9f9;
      padding: 16px;
      border-radius: 8px;
    }

    .detail-section h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 16px 0;
      color: #333;
      font-size: 1.1rem;
    }

    .detail-section h3 mat-icon {
      color: #666;
    }

    .detail-item {
      margin-bottom: 8px;
      font-size: 0.9rem;
    }

    .detail-item strong {
      color: #333;
      margin-right: 8px;
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

    @media (max-width: 768px) {
      .user-details-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .user-detail-container {
        padding: 0 8px;
      }

      .detail-section {
        padding: 12px;
      }
    }
  `]
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private userId: number | null = null;

  user$;
  loading$;
  error$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.select(selectSelectedUser);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.store.dispatch(UserActions.loadUser({ id: this.userId }));
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(UserActions.clearSelectedUser());
  }

  goBack() {
    this.router.navigate(['/']);
  }

  retryLoad() {
    if (this.userId) {
      this.store.dispatch(UserActions.loadUser({ id: this.userId }));
    }
  }
}
