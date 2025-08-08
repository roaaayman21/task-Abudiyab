import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private loadingService = inject(LoadingService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      tap(() => this.loadingService.show()),
      switchMap(({ page, limit }) => {
        const skip = (page - 1) * limit;
        return this.userService.getUsers(limit, skip).pipe(
          map(response => {
            this.loadingService.hide();
            return UserActions.loadUsersSuccess({ response, page });
          }),
          catchError(error => {
            this.loadingService.hide();
            return of(UserActions.loadUsersFailure({
              error: error.message || 'Failed to load users'
            }));
          })
        );
      })
    )
  );

  loadUserDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserDetail),
      tap(() => this.loadingService.show()),
      switchMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map(user => {
            this.loadingService.hide();
            if (user) {
              return UserActions.loadUserDetailSuccess({ user });
            } else {
              return UserActions.loadUserDetailFailure({
                error: 'User not found'
              });
            }
          }),
          catchError(error => {
            this.loadingService.hide();
            return of(UserActions.loadUserDetailFailure({
              error: error.message || 'Failed to load user details'
            }));
          })
        )
      )
    )
  );
}
