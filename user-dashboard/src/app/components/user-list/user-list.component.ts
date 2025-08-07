import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  usersPerPage = 12;
  totalUsers = 0;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    const skip = (this.currentPage - 1) * this.usersPerPage;

    this.userService.getUsers(this.usersPerPage, skip).subscribe({
      next: (response) => {
        this.users = response.users.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image
        }));
        this.totalUsers = response.total;
        this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
        this.loading = false;
      }
    });
  }

  onUserClick(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }
}
