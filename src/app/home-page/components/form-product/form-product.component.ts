import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { isEmpty } from 'rxjs';
import { Multer} from "multer";


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {

  private product: IProduct;
  public isUploadImg: boolean = false;
  public fileImg:string;
  public formProduct = this.formBuilder.group({
    name:["", Validators.required],
    price:["", Validators.required],
    description:["", Validators.required]
  })

  constructor(
    private productsService: ProductsService,
    private formBuilder:FormBuilder,
  ){

  }

  public showForm():void{
    console.log(this.formProduct.value);
    console.log(this.formProduct.valid);
  }

  public showResponse():void{
    this.productsService.getAllProducts().subscribe(value => console.log(value));
  }

  public postProduct():void{
    if(this.formProduct.valid){
      this.product = this.formProduct.value as unknown as IProduct;
      this.product.price = Number(this.product.price);
      this.productsService.postProduct(this.product).subscribe(value => console.log(value));
    }else{
      alert("Conteúdo inválido");
    }
  }

  public setFile(file:HTMLInputElement){
    this.isUploadImg = true;
    let teste:string;
    let teste2: Multer;
    console.log((file.files as FileList)[0]);
    this.fileImg = URL.createObjectURL((file.files as FileList)[0]);
    console.log(this.fileImg);
  }
}
