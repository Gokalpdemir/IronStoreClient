import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService } from '../../../services/ui/custom-toastr.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    private toastService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  async Login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallSpinFade)
   const result :any= await this.userService.Login(userNameOrEmail, password,()=>this.hideSpinner(SpinnerType.BallSpinFade));
   
  }
}
