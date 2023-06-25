import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})

//Mediante el uso de las directivas podemos correctamente manipular el DOM
//cuando usamos ANGULAR
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }
  constructor(private element: ElementRef) {
    //this.element.nativeElement.style.backgroundColor = 'yellow';
  }

}
