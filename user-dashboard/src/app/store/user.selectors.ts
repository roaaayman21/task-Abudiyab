import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('user');

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

export const selectTotalUsers = createSelector(
  selectUserState,
  (state: UserState) => state.totalUsers
);

export const selectUsersPerPage = createSelector(
  selectUserState,
  (state: UserState) => state.usersPerPage
);

export const selectTotalPages = createSelector(
  selectTotalUsers,
  selectUsersPerPage,
  (totalUsers: number, usersPerPage: number) => Math.ceil(totalUsers / usersPerPage)
);

export const selectSearchResults = createSelector(
  selectUserState,
  (state: UserState) => state.searchResults
);

export const selectSearchLoading = createSelector(
  selectUserState,
  (state: UserState) => state.searchLoading
);

export const selectSearchError = createSelector(
  selectUserState,
  (state: UserState) => state.searchError
);

export const selectPaginationInfo = createSelector(
  selectCurrentPage,
  selectTotalPages,
  selectTotalUsers,
  selectUsersPerPage,
  (currentPage: number, totalPages: number, totalUsers: number, usersPerPage: number) => ({
    currentPage,
    totalPages,
    totalUsers,
    usersPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  })
);
