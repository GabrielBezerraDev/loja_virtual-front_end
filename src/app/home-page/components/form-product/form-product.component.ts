import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ToConvertBase64Service } from '../../../services/to-convert-base64.service';


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
    description:["", Validators.required],
    imgBase64:["",Validators.required]
  })

  constructor(
    private productsService: ProductsService,
    private formBuilder:FormBuilder,
    private toConvertBase64Service: ToConvertBase64Service
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
      console.log(this.product);
      this.productsService.postProduct(this.product).subscribe(value => console.log(value));
    }else{
      alert("Conteúdo inválido");
    }
  }

  public async setFile(file:HTMLInputElement){
    this.isUploadImg = true;
    await this.toConvertBase64Service.toConvertBase64((file.files as FileList)[0])
    .then(value => this.fileImg = value);
    this.formProduct.get("imgBase64")?.setValue(this.fileImg);
  }
}
