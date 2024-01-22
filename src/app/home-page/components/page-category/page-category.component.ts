import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';

interface GenericFunction<T>{
  ():T
}

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrl: './page-category.component.scss'
})
export class PageCategoryComponent {

  constructor(
    private navigate:NavigateService
  ){}

  public navigateTo(route:string):void{
    this.navigate.navigateTo(route);
  }

}
