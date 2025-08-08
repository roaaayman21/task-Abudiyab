import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-bar" *ngIf="loadingService.loading$ | async">
      <div class="loading-progress"></div>
    </div>
  `,
  styles: [`
    .loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: rgba(6, 182, 212, 0.2);
      z-index: 9999;
    }

    .loading-progress {
      height: 100%;
      background: linear-gradient(90deg, #06b6d4, #0891b2);
      width: 0%;
      animation: loading 2s ease-in-out infinite;
    }

    @keyframes loading {
      0% {
        width: 0%;
        margin-left: 0%;
      }
      50% {
        width: 75%;
        margin-left: 25%;
      }
      100% {
        width: 0%;
        margin-left: 100%;
      }
    }
  `]
})
export class LoadingBarComponent {
  constructor(public loadingService: LoadingService) {}
}
