import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// User interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    const skip = (this.currentPage - 1) * this.usersPerPage;

    // Simulate API call - we'll replace this with actual service later
    setTimeout(() => {
      // Mock data for now
      this.users = [
        { id: 1, firstName: 'John', lastName: 'Doe', image: 'https://dummyjson.com/icon/johndoe/128' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', image: 'https://dummyjson.com/icon/janesmith/128' },
        { id: 3, firstName: 'Bob', lastName: 'Johnson', image: 'https://dummyjson.com/icon/bobjohnson/128' },
        { id: 4, firstName: 'Alice', lastName: 'Brown', image: 'https://dummyjson.com/icon/alicebrown/128' },
      ];
      this.totalUsers = 100; // Mock total
      this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
      this.loading = false;
    }, 1000);
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
