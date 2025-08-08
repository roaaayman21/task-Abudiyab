import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  // When we start loading users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUsersSuccess, (state, { response, page }) => ({
    ...state,
    loading: false,
    users: response.users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image
    })),
    currentPage: page,
    totalUsers: response.total,
    totalPages: Math.ceil(response.total / response.limit),
    error: null
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // When we start loading one user's details
  on(UserActions.loadUserDetail, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUserDetailSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    selectedUser: user,
    error: null
  })),

  on(UserActions.loadUserDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    selectedUser: null,
    error
  })),

  // When we need to clean up
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUser: null
  })),

  on(UserActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
