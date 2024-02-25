import { Injectable, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapUtils implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  public static activedTooltips(elements:Array<HTMLElement>):void{
    const tooltipTriggerList: Array<HTMLElement> = elements;
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }

  public static disableTooltips(elements:Array<HTMLElement>):void{
    const tooltipTriggerList: Array<HTMLElement> = elements;
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => bootstrap.Tooltip.getInstance(tooltipTriggerEl)?.hide())
  }
}
