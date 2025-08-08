import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UserDetail } from '../../services/user.service';
import * as UserSelectors from '../../store/user.selectors';
import * as UserActions from '../../store/user.actions';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$: Observable<UserDetail | null>;
  loading$: Observable<boolean>;

  private destroy$ = new Subject<void>();
  private userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.user$ = this.store.select(UserSelectors.selectSelectedUser);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.clearSelectedUser());
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUser(): void {
    this.store.dispatch(UserActions.loadUserDetail({ userId: this.userId }));
  }

  goBack(): void {
    // Go back to the main user list
    this.router.navigate(['/users']);
  }
}
