import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// Extended User interface for details
export interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: UserDetail | null = null;
  loading = false;
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  loadUser(): void {
    this.loading = true;

    // Simulate API call - we'll replace this with actual service later
    setTimeout(() => {
      // Mock user data
      if (this.userId >= 1 && this.userId <= 10) {
        this.user = {
          id: this.userId,
          firstName: 'User',
          lastName: `${this.userId}`,
          image: `https://dummyjson.com/icon/user${this.userId}/128`,
          email: `user${this.userId}@example.com`,
          phone: `+1-555-000-${this.userId.toString().padStart(4, '0')}`,
          age: 20 + this.userId,
          gender: this.userId % 2 === 0 ? 'Female' : 'Male'
        };
      } else {
        this.user = null;
      }
      this.loading = false;
    }, 1000);
  }

  goBack(): void {
    this.location.back();
  }
}
