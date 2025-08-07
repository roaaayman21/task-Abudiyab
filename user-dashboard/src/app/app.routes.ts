import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent),
    title: 'User Dashboard'
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent),
    title: 'User Details'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
