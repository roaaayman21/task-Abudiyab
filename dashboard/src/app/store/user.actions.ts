import { createAction, props } from '@ngrx/store';
import { User, UserDetail, UsersResponse } from '../services/user.service';

// Actions for getting the user list
export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number; limit: number }>()
);

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ response: UsersResponse; page: number }>()
);

export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: string }>()
);

// Actions for getting one specific user
export const loadUserDetail = createAction(
  '[User Detail] Load User Detail',
  props<{ userId: number }>()
);

export const loadUserDetailSuccess = createAction(
  '[User Detail] Load User Detail Success',
  props<{ user: UserDetail }>()
);

export const loadUserDetailFailure = createAction(
  '[User Detail] Load User Detail Failure',
  props<{ error: string }>()
);

// Actions for cleaning up data
export const clearSelectedUser = createAction(
  '[User] Clear Selected User'
);

export const clearError = createAction(
  '[User] Clear Error'
);
