import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent) },
  { path: 'user/:id', loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
  { path: '**', redirectTo: '/users' }
];
