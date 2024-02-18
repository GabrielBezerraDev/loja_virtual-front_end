import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { ToConvertBase64Service } from '../../../services/to-convert-base64.service';
import { ECategorys } from '../../enum/ECategorys';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IUpdateProducts } from '../../interfaces/IUpdateProducts';
import { NavigateService } from '../../../services/navigate.service';
import { ModalComponent } from '../../../shared/components/modal/modal/modal.component';
import { IModal } from '../../../shared/interfaces/IModal';
import { BootstrapUtilsService } from '../../../services/bootstrap-utils.service';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../interfaces/ICategory';




@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit, OnDestroy {

  @ViewChild(ModalComponent) modal: ModalComponent;

  private product: IProduct;
  private formType: boolean;
  public hideButtonModal: boolean = true;
  public idProduct:number;
  public enumsCategory: Array<ECategorys> = Object.values(ECategorys);
  public categorys: Array<ICategory>;
  public isUploadImg: boolean = false;
  public isUpdateForm: boolean = false;
  public fileImg:string;
  public modalInterface: IModal =
  {
    tittleModal: "",
    bodyModal: "",
    buttonLeftTittle: "",
    buttonRightTittle: ""
  };
  public formProduct = this.formBuilder.group({
    name:["", Validators.required],
    price:["", Validators.required],
    description:["", Validators.required],
    imgBase64:["",Validators.required],
    categoryId: ["", Validators.required],
    codeProduct: ["", Validators.required]
  })

  constructor(
    private productsService: ProductsService,
    private localStorage: LocalStorageService,
    private navigate: NavigateService,
    private formBuilder:FormBuilder,
    private toConvertBase64Service: ToConvertBase64Service,
    private elementRef: ElementRef,
    private bootstrapUtils: BootstrapUtilsService,
    private categoryService: CategoryService
  ){
  }

  async ngOnInit(): Promise<void>{
      this.setFormType();
      this.activedTooltips();
      await this.getAllCategory();
      console.log(this.categorys);
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
      this.disableTooltips();
  }

  private getAllCategory():Promise<void>{
    return new Promise((resolve, rejects) => {
      this.categoryService.getAllCategory().subscribe(
        {
          next: (value) => {
            this.categorys = value
            resolve();
          }
        }
      )
    })
  }

  private async postForm():Promise<void>{
    if(this.formProduct.valid){
      new Promise((resolve,reject) =>
      {
        this.productsService.postProduct(this.product).subscribe({
          next: () => resolve
          (
            this.setModalInterface
            ({
              tittleModal: "Novo Produto Adicionado!",
              bodyModal: `O produto ${this.product.name} foi adicionado no estoque!`,
              buttonRightTittle: "Fechar",
              buttonLeftTittle: ""
            })
          ),
          error: () => reject
          (
            this.setModalInterface
            ({
              tittleModal: "Não foi possível adicionar Produto",
              bodyModal: `Por favor, tente novamente!`,
              buttonRightTittle: "Fechar",
              buttonLeftTittle: ""
            })
          )
        });
      });
    }else{
      this.setModalInterface
      ({
        tittleModal: "Dados inválidos!",
        bodyModal: `O formulário não foi preenchido corretamente!`,
        buttonRightTittle: "Fechar",
        buttonLeftTittle: ""
      })
    }
  }

  private async patchForm():Promise<void>{
    if(!this.isUpdateForm){
      this.setModalInterface
      ({
        tittleModal: "Os dados do produto não foram alterados!",
        bodyModal: `Mude os dados do produto para atualiza-lo...`,
        buttonRightTittle: "Fechar",
        buttonLeftTittle: ""
      });
      return;
    }
    await new Promise((resolve,reject) =>
    {
      this.productsService.patchProduct(this.product,this.idProduct)
      .subscribe({
        next: () =>
        {
          resolve(
            this.setModalInterface
            ({
              tittleModal: "Atualizado com sucesso!",
              bodyModal: `O produto \"${this.product.name}\" foi atualizado com sucesso!`,
              buttonRightTittle: "Fechar",
              buttonLeftTittle: ""
            })
          );

        },
        error: () =>
        {
        reject(
          this.setModalInterface
          ({
            tittleModal: "Algo deu errado...",
            bodyModal: `Não foi possível atualizar o produto \"${this.product.name}\", por favor, tente novamente`,
            buttonRightTittle: "Fechar",
            buttonLeftTittle: ""
          })
          );
        }
      });
    })
  }

  private activedTooltips():void{
    this.bootstrapUtils.activedTooltips(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
  }

  private disableTooltips():void{
    this.bootstrapUtils.disableTooltips(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
  }

  private setModalInterface(modalInterface: IModal):void{
    this.modalInterface = modalInterface;
  }

  private setFormType():void{
    this.formType = this.localStorage.getDataLocalStorage("isEditForm");
  }

  private setCodeProduct():void{
    this.productsService.getNewCodeProduct()
    .subscribe({
      next: value => this.formProduct.get("codeProduct")?.setValue(value)
    });
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

  private showModal():void{
    this.modal.showModal();
  }

  private checkObjectsProducts():void{
    for(let i:number = 0; i < Object.keys(this.product).length; i++){
      if(Object.keys(this.product)[i] === "id") continue;
      if(this.product[Object.keys(this.product)[i] as keyof IProduct] !== (this.formProduct.value as unknown as IProduct)[Object.keys(this.product)[i] as keyof IProduct]){
        this.isUpdateForm = true;
      }
    }
  }

  public returnButton():void{
    this.navigate.navigateURL("home/page-category");
  }

  public redirectPageCategory():void{
    if(this.isUpdateForm || (!this.formType && this.formProduct.valid))
    this.navigate.navigateURL("home/page-category");
  }

  public async sendForm():Promise<void>{
    if(this.formType) this.checkObjectsProducts();
    this.product = this.formProduct.value as unknown as IProduct;
    this.product.price = Number(this.product.price);
    this.product.categoryId = Number(this.product.categoryId);
    this.formType ? [await this.patchForm(), this.showModal() ] : [await this.postForm(), this.showModal()];
  }

  public showResponse():void{
    this.productsService.getAllProducts()
    .subscribe();
  }

  public async setFile(file:HTMLInputElement){
    this.isUploadImagem(true);
    await this.toConvertBase64Service.toConvertBase64((file.files as FileList)[0])
    .then(value => this.fileImg = value);
    this.formProduct.get("imgBase64")?.setValue(this.fileImg);
  }

  public setSelectValue(selectCategory:HTMLSelectElement):void{
    this.formProduct.get("categoryId")?.setValue(selectCategory.selectedOptions[0].value);
  }


}
