import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NavigateService } from '../../../services/navigate.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() product: IProduct;

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

}
