import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ToConvertBase64Service } from '../../../services/to-convert-base64.service';
import { ECategorys } from '../../enum/ECategorys';
import { LocalStorageService } from '../../../services/local-storage.service';


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

  ngOnInit(): void {
      this.formType = this.localStorage.getDataLocalStorage("isEditForm");
      this.productsService.getNewCodeProduct().subscribe(value => this.formProduct.get("codeProduct")?.setValue(value));
      if(this.formType) this.idProduct = this.localStorage.getDataLocalStorage("idProduct");
  }

  ngOnDestroy(): void {
      this.localStorage.removeDataLocalStorage("isEditForm");
  }

  public test():void{
    alert("Funcionou");
  }

  public showForm():void{
    console.log(this.formProduct.value);
    console.log(this.formProduct.valid);
  }

  public showResponse():void{
    this.productsService.getAllProducts().subscribe(value => console.log(value));
  }

  public postProduct():void{
    if(this.formProduct.valid && !this.formType){
      // this.product = this.formProduct.value as unknown as IProduct;
      // this.product.price = Number(this.product.price);
      // console.log(this.product);
      // this.productsService.postProduct(this.product).subscribe(value => console.log(value));
    }else{
      alert("teste");
      this.product = this.formProduct.value as unknown as IProduct;
      this.product.price = Number(this.product.price);
      console.log(this.product);
      let updateProduct: Partial<IProduct> = this.product;
      this.productsService.patchProduct(updateProduct,this.idProduct).subscribe(value => console.log(value));
    }
  }

  public async setFile(file:HTMLInputElement){
    this.isUploadImg = true;
    await this.toConvertBase64Service.toConvertBase64((file.files as FileList)[0])
    .then(value => this.fileImg = value);
    this.formProduct.get("imgBase64")?.setValue(this.fileImg);
  }

  public setSelectValue(selectCategory:HTMLSelectElement):void{
    this.formProduct.get("category")?.setValue(selectCategory.selectedOptions[0].innerText);
    console.log(this.formProduct.value.category);
  }
}
