import { trigger, transition, style, animate } from '@angular/animations';

// Makes things fade in from the bottom - looks smooth
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Slides things in from the left side
export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

// Makes cards pop in with a little zoom effect
export const scaleInAnimation = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);
