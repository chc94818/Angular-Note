import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})


export class HighlightDirective {
  @Input() highlightColor: string;
  @Input() appHighlight: string;
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // use Renderer2 to set style
  // ngOnInit() {
  //   this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue');
  // }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
