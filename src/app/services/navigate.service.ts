import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor
  (
    private route: Router
  ) { }

  public navigateTo(route:string):void{
    this.route.navigate([route]);
  }

  public navigateURL(route:string){
    this.route.navigateByUrl(route);
  }
}
