import { createAction, props } from '@ngrx/store';
import { User, UsersResponse } from '../models/user.model';

// Load Users Actions
export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ limit: number; skip: number }>()
);

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ response: UsersResponse }>()
);

export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: string }>()
);

// Load Single User Actions
export const loadUser = createAction(
  '[User Detail] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User Detail] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User Detail] Load User Failure',
  props<{ error: string }>()
);

// Search User Actions
export const searchUser = createAction(
  '[User Search] Search User',
  props<{ id: number }>()
);

export const searchUserSuccess = createAction(
  '[User Search] Search User Success',
  props<{ user: User | null }>()
);

export const searchUserFailure = createAction(
  '[User Search] Search User Failure',
  props<{ error: string }>()
);

// Clear Search Results
export const clearSearchResults = createAction(
  '[User Search] Clear Search Results'
);

// Set Current Page
export const setCurrentPage = createAction(
  '[User List] Set Current Page',
  props<{ page: number }>()
);

// Clear Selected User
export const clearSelectedUser = createAction(
  '[User Detail] Clear Selected User'
);
