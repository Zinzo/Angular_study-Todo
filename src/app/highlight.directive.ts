import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input()
  private highlightColor: string;

  constructor(private el:ElementRef) {
    el.nativeElement.style.backgroundColor = 'null';
  }

  @HostListener('mouseenter')
  mouseEnter(){
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseLeave(){
    this.el.nativeElement.style.backgroundColor = null;
  }

}
