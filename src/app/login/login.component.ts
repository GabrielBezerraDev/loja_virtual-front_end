import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from '../services/navigate.service';
import { authLoginGuard } from '../services/routingGuard/auth-login.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ModalComponent } from '../shared/components/modal/modal/modal.component';
import { IModal } from '../shared/interfaces/IModal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  @ViewChild(ModalComponent) modal: ModalComponent;

  public errorForm!: string;
  public modalInterface: IModal = {
    tittleModal: "Algo deu errado!",
    bodyModal: "",
    buttonLeftTittle: "",
    buttonRightTittle: "Okay"
  }
  public formLogin = this.formBuilder.group({
    email: ["", Validators.required],
    token: ["", Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private navigateService: NavigateService,
    private loginService: LoginService
    ){}

  private checkValidateForm():void{
    if(!this.formLogin.get("email")?.valid && !this.formLogin.get("token")?.valid){
      this.setErrorForm("É obrigatório preencher todos os campos");
    }
    else if(!this.formLogin.get("email")?.valid){
      this.setErrorForm("O campo email é obrigatório!");
    }
    else if(!this.formLogin.get("token")?.valid){
      this.setErrorForm("O campo senha é obrigatório!");
    }
  }

  private showModal():void{
    this.modal.showModal();
  }

  private setErrorForm(error:string):void{
    this.modalInterface.bodyModal = error;
  }

  private getErrorForm(): string{
    return this.modalInterface.bodyModal;
  }

  private resetError():void{
    this.modalInterface.bodyModal = "";
  }

  public teste():void{
    console.log(this.formLogin.value);
  }

  public async redirectHome():Promise<void>{
    await this.navigateService.navigateToWithPromise("home").then(() => {
      this.loginService.isAllow = false;
      this.resetError();
    });

  }

  public login():void{
    this.resetError();
    this.checkValidateForm();
    if(this.getErrorForm()) {
      this.showModal();
      return;
    }
    this.loginService.authenticator(this.formLogin.value.email as string).subscribe({
      next: (user) => {
        if(!user || user.token !== this.formLogin.value.token as string) {
          console.log(user)
          this.setErrorForm("Senha ou email incorreto!");
          this.showModal();
          return;
        }
        console.log(user);
        this.loginService.isAllow = true;
        this.redirectHome();
      }
    });
  }
}
