import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: string = '';

  @Output() searchUser = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  onSearchEnter(): void {
    if (this.searchQuery.trim()) {
      // Navigate to user detail page if it's a number (user ID)
      const userId = parseInt(this.searchQuery.trim());
      if (!isNaN(userId) && userId > 0) {
        this.router.navigate(['/user', userId]);
      } else {
        // If not a number, search for users by name
        this.searchUsers();
      }
    }
  }

  private searchUsers(): void {
    // For now, just navigate to users page
    // In a more advanced implementation, we could pass search results
    this.router.navigate(['/users']);
    this.searchUser.emit(this.searchQuery);
  }
}
