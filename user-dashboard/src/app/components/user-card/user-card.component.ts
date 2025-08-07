import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="user-card" (click)="onCardClick()">
      <mat-card-header>
        <div mat-card-avatar class="user-avatar">
          <img [src]="user.image" [alt]="user.firstName + ' ' + user.lastName" />
        </div>
        <mat-card-title>{{ user.firstName }} {{ user.lastName }}</mat-card-title>
        <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="user-info">
          <div class="info-item">
            <mat-icon>phone</mat-icon>
            <span>{{ user.phone }}</span>
          </div>
          <div class="info-item">
            <mat-icon>business</mat-icon>
            <span>{{ user.company.name }}</span>
          </div>
          <div class="info-item">
            <mat-icon>location_on</mat-icon>
            <span>{{ user.address.city }}, {{ user.address.state }}</span>
          </div>
        </div>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-button color="primary" (click)="onViewDetails($event)">
          <mat-icon>visibility</mat-icon>
          View Details
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .user-card {
      cursor: pointer;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      max-width: 350px;
      margin: 0 auto;
    }
    
    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }
    
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    mat-card-header {
      padding-bottom: 16px;
    }
    
    mat-card-title {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    mat-card-subtitle {
      font-size: 0.9rem;
      color: #666;
    }
    
    mat-card-content {
      flex: 1;
      padding-top: 0;
    }
    
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      color: #555;
    }
    
    .info-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #666;
    }
    
    .info-item span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    mat-card-actions {
      padding-top: 8px;
      margin-top: auto;
    }
    
    mat-card-actions button {
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .user-card {
        max-width: 100%;
      }
      
      mat-card-title {
        font-size: 1.1rem;
      }
      
      .info-item {
        font-size: 0.85rem;
      }
    }
  `]
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() cardClick = new EventEmitter<User>();
  @Output() viewDetails = new EventEmitter<User>();

  onCardClick() {
    this.cardClick.emit(this.user);
  }

  onViewDetails(event: Event) {
    event.stopPropagation();
    this.viewDetails.emit(this.user);
  }
}
