import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';

// Simple hover effect directive - adds background color and scale on hover
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() highlightColor = 'rgba(6, 182, 212, 0.12)';
  @Input() scaleAmount = '1.03';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Add smooth transition
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.scaleAmount})`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
