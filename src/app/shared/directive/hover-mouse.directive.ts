import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHoverMouse]'
})
export class HoverMouseDirective {
  @Output() onStatusHover: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isHover: boolean = false;
  constructor() { }

  @HostListener("mouseover",["$event.target"]) mouseOver():void{
    this.isHover = true;
    this.onStatusHover.emit(this.isHover);
  }

  @HostListener("mouseout",["$event.target"]) mouseOut():void{
    this.isHover = false;
    this.onStatusHover.emit(this.isHover);
  }

}
