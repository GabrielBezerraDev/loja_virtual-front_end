import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NavigateService } from '../../../services/navigate.service';
import { ModalComponent } from '../../../shared/components/modal/modal/modal.component';
import { IModal } from '../../../shared/interfaces/IModal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ViewChild(ModalComponent) modal: ModalComponent;
  @Output() onDeleteProduct: EventEmitter<number> = new EventEmitter<number>();
  @Input() product: IProduct;
  public modalInterface: IModal =
  {
    tittleModal: "Deletar Produto",
    bodyModal: "Você tem certeza que deseja deletar este Produto?",
    buttonLeftTittle: "Cancelar",
    buttonRightTittle: "Deletar"
  }

  constructor(
    private localStorage: LocalStorageService,
    private navigate: NavigateService
  ){}

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
    if(value) this.onDeleteProduct.emit(this.product.id);
  }

}
