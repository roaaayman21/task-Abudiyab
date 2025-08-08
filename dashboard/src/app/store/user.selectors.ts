import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectCurrentPage = createSelector(
  selectUserState,
  (state: UserState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectUserState,
  (state: UserState) => state.totalPages
);

export const selectTotalUsers = createSelector(
  selectUserState,
  (state: UserState) => state.totalUsers
);

export const selectPaginationInfo = createSelector(
  selectCurrentPage,
  selectTotalPages,
  selectTotalUsers,
  (currentPage, totalPages, totalUsers) => ({
    currentPage,
    totalPages,
    totalUsers
  })
);
