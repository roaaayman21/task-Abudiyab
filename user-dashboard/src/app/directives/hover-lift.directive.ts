import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverLift]',
  standalone: true
})
export class HoverLiftDirective {
  @Input() liftHeight: string = '4px';
  @Input() shadowIntensity: string = '0.15';
  @Input() transitionDuration: string = '0.3s';

  private originalTransform: string = '';
  private originalBoxShadow: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Store original styles
    this.originalTransform = this.el.nativeElement.style.transform || '';
    this.originalBoxShadow = this.el.nativeElement.style.boxShadow || '';
    
    // Set initial transition
    this.renderer.setStyle(
      this.el.nativeElement, 
      'transition', 
      `transform ${this.transitionDuration} ease, box-shadow ${this.transitionDuration} ease`
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(-${this.liftHeight}) ${this.originalTransform}`.trim()
    );
    
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `0 8px 16px rgba(0,0,0,${this.shadowIntensity})`
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      this.originalTransform
    );
    
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      this.originalBoxShadow
    );
  }
}
