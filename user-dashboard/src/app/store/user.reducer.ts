import { createReducer, on } from '@ngrx/store';
import { UserState } from '../models/user.model';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalUsers: 0,
  usersPerPage: 10,
  searchResults: null,
  searchLoading: false,
  searchError: null
};

export const userReducer = createReducer(
  initialState,

  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUsersSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    users: response.users,
    totalUsers: response.total,
    error: null
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    users: []
  })),

  // Load Single User
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    selectedUser: user,
    error: null
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    selectedUser: null
  })),

  // Search User
  on(UserActions.searchUser, (state) => ({
    ...state,
    searchLoading: true,
    searchError: null
  })),

  on(UserActions.searchUserSuccess, (state, { user }) => ({
    ...state,
    searchLoading: false,
    searchResults: user,
    searchError: null
  })),

  on(UserActions.searchUserFailure, (state, { error }) => ({
    ...state,
    searchLoading: false,
    searchError: error,
    searchResults: null
  })),

  // Clear Search Results
  on(UserActions.clearSearchResults, (state) => ({
    ...state,
    searchResults: null,
    searchError: null,
    searchLoading: false
  })),

  // Set Current Page
  on(UserActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page
  })),

  // Clear Selected User
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUser: null
  }))
);
