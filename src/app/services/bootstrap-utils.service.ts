import { Injectable, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapUtilsService implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  public activedTooltips(elements:Array<HTMLElement>):void{
    const tooltipTriggerList: Array<HTMLElement> = elements;
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }
}
