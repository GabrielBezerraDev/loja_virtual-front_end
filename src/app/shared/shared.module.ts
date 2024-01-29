import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { HoverMouseDirective } from './directive/hover-mouse.directive';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    ModalComponent,
    SpinnerComponent,
    PaginationComponent,
    LogoComponent,
    HoverMouseDirective
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ModalComponent,
    SpinnerComponent,
    PaginationComponent,
    HoverMouseDirective
  ]
})
export class SharedModule { }
