import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NavigateService } from '../../../services/navigate.service';
// import { ModalComponent } from '../../../shared/components/modal/modal/modal.component';
import { IModal } from '../../../shared/interfaces/IModal';
import { ModalComponent } from '../../../shared/components/modal/modal/modal.component';
import { WindowUtilsService } from '../../../services/window-utils.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit{
  @ViewChild(ModalComponent) modal: ModalComponent;
  @Output() onDeleteProduct: EventEmitter<number> = new EventEmitter<number>();
  @Input() product: IProduct;
  public cardNotification: HTMLElement
  public modalInterface: IModal =
  {
    tittleModal: "Deletar Produto",
    bodyModal: "Você tem certeza que deseja deletar este Produto?",
    buttonLeftTittle: "Cancelar",
    buttonRightTittle: "Deletar"
  }

  constructor(
    private localStorage: LocalStorageService,
    private navigate: NavigateService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private windowUtilsService: WindowUtilsService
  ){}

    ngAfterViewInit(): void {
      this.cardNotification = this.elementRef.nativeElement.querySelector(".notification");
    }

  public setFormType(value:boolean, product:IProduct):void{
    this.localStorage.setDataLocalStorage("isEditForm",value);
    this.localStorage.setDataLocalStorage("bodyProduct",product);
  }

  public navigateTo(route:string):void{
    this.navigate.navigateTo(route);
  }

  public deleteProduct():void{
    this.modal.showModal();
  }

  public responseUser(value:boolean):void{
    if(value) {
      this.onDeleteProduct.emit(this.product.id);
      this.windowUtilsService.reloadPage();
    }
  }

  public cardStatus(value:boolean):void{
    let opacityValue: number = 0;
    value ? opacityValue = 1 : opacityValue = 0;
    this.renderer.setStyle(this.cardNotification, "opacity",`${opacityValue}`);
  }

}
