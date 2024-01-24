import { Component, Input } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { ICategory } from '../../interfaces/ICategory';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

@Input() productsCategory: Array<ICategory> = [];

  constructor(){}

}
