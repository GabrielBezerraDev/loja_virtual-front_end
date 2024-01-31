import { Component, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { IModal } from '../../../interfaces/IModal';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit{

  @Output() onResponseUser: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() modalInterface: Partial<IModal>;
  @Input() hideButton = false;

  public modal: bootstrap.Modal;

  constructor(
    private elementRef: ElementRef,
  ){}

    ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.elementRef.nativeElement.querySelector(".modal"));
    }

  public showModal():void{
    this.modal.show();
  }

  public responseUser(value:boolean):void{
    this.modal.hide();
    this.onResponseUser.emit(value);
  }

}
