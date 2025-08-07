import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  onSearchEnter(): void {
    if (this.searchQuery.trim()) {
      // Navigate to user detail page if it's a number (user ID)
      const userId = parseInt(this.searchQuery.trim());
      if (!isNaN(userId)) {
        this.router.navigate(['/user', userId]);
      }
    }
  }
}
