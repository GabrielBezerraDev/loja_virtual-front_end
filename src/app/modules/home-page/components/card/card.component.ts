import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';
import { IProduct } from '../../interfaces/IProduct';
import { NavigateService } from '../../../../services/navigate/navigate.service';
import { IModal } from '../../../../shared/interfaces/IModal';
import { ModalComponent } from '../../../../shared/components/modal/modal/modal.component';
import { WindowUtils } from '../../../../utils/window/window-utils';
import { BootstrapUtils } from '../../../../utils/bootstrap/bootstrap-utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit, OnInit, OnDestroy{
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
  ){}

    ngOnInit(): void {
      this.activedTooltips();
    }

    ngOnDestroy(): void {
      this.disableTooltips();
    }

    ngAfterViewInit(): void {
      this.cardNotification = this.elementRef.nativeElement.querySelector(".notification");
    }

  private activedTooltips():void{
    BootstrapUtils.activedTooltips(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
  }

  private disableTooltips():void{
    BootstrapUtils.disableTooltips(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
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
      WindowUtils.reloadPage();
    }
  }

  public cardStatus(value:boolean):void{
    let opacityValue: number = 0;
    value ? opacityValue = 1 : opacityValue = 0;
    this.renderer.setStyle(this.cardNotification, "opacity",`${opacityValue}`);
  }

}
