import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(action =>
        this.userService.getUsers(action.limit, action.skip).pipe(
          map(response => UserActions.loadUsersSuccess({ response })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(action =>
        this.userService.getUserById(action.id).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUser),
      mergeMap(action =>
        this.userService.searchUserById(action.id).pipe(
          map(user => UserActions.searchUserSuccess({ user })),
          catchError(error => of(UserActions.searchUserFailure({ error: error.message })))
        )
      )
    )
  );
}
