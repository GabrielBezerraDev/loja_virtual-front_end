import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ToConvertBase64Service } from '../../../services/to-convert-base64.service';
import { ECategorys } from '../../enum/ECategorys';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IUpdateProducts } from '../../interfaces/IUpdateProducts';



@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit, OnDestroy {

  private product: IProduct;
  private formType: boolean;
  public idProduct:number;
  public enumsCategory: Array<ECategorys> = Object.values(ECategorys);
  public isUploadImg: boolean = false;
  public fileImg:string;
  public formProduct = this.formBuilder.group({
    name:["", Validators.required],
    price:["", Validators.required],
    description:["", Validators.required],
    imgBase64:["",Validators.required],
    category: ["", Validators.required],
    codeProduct: ["", Validators.required]
  })

  constructor(
    private productsService: ProductsService,
    private localStorage: LocalStorageService,
    private formBuilder:FormBuilder,
    private toConvertBase64Service: ToConvertBase64Service
  ){
  }

  ngOnInit(): void{
      this.setFormType();
      if(this.formType) {
        this.setBodyProduct();
        this.setIdProdcut();
        this.setFormProduct();
        this.setImageProduct();
        this.isUploadImagem(true);
        return;
      };
      this.setCodeProduct();
  }

  ngOnDestroy(): void {
      this.localStorage.removeDataLocalStorage("isEditForm");
  }

  private postForm():void{
    if(this.formProduct.valid){
      this.productsService.postProduct(this.product).subscribe(value => console.log(value));
    }
  }

  private patchForm():void{
    this.productsService.patchProduct(this.product,this.idProduct).subscribe(value => console.log(value));
  }

  private setFormType():void{
    this.formType = this.localStorage.getDataLocalStorage("isEditForm");
  }

  private setCodeProduct():void{
    this.productsService.getNewCodeProduct().subscribe(value => this.formProduct.get("codeProduct")?.setValue(value));
  }

  private setBodyProduct():void{
    this.product = this.localStorage.getDataLocalStorage("bodyProduct");
  }

  private setFormProduct():void{
    let currentProduct: IUpdateProducts = this.product;
    this.formProduct.patchValue(currentProduct as typeof this.formProduct.value);
  }

  private setIdProdcut():void{
    this.idProduct = this.product.id;
  }

  private setImageProduct():void{
    this.fileImg = this.product.imgBase64;
  }

  private isUploadImagem(value:boolean):void{
    this.isUploadImg = value;
  }

  public sendForm():void{
    this.product = this.formProduct.value as unknown as IProduct;
    this.product.price = Number(this.product.price);
    this.formType ? this.postForm() : this.patchForm();
  }

  public showForm():void{
    console.log(this.formProduct.value);
    console.log(this.formProduct.valid);
  }

  public showResponse():void{
    this.productsService.getAllProducts().subscribe(value => console.log(value));
  }

  public async setFile(file:HTMLInputElement){
    this.isUploadImagem(true);
    await this.toConvertBase64Service.toConvertBase64((file.files as FileList)[0])
    .then(value => this.fileImg = value);
    this.formProduct.get("imgBase64")?.setValue(this.fileImg);
  }

  public setSelectValue(selectCategory:HTMLSelectElement):void{
    this.formProduct.get("category")?.setValue(selectCategory.selectedOptions[0].innerText);
    console.log(this.formProduct.value.category);
  }
}
