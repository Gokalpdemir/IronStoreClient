import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService:CustomToastrService,
    spinner:NgxSpinnerService
  ) {super(spinner)}

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(3),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(100), Validators.email],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8), // Minimum 8 karakter
            Validators.maxLength(40),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.,;])[A-Za-z\d@$!%*?&#.,;]+$/
            ), // En az bir küçük harf, bir büyük harf, bir rakam ve bir özel karakter içermelidir
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const passwordConfirmControl = formGroup.get('passwordConfirm');

    if (passwordControl.value === passwordConfirmControl.value) {
      passwordConfirmControl.setErrors(null); // Eşleşiyorsa hata yok
      if (passwordControl.errors) {
        passwordConfirmControl.setErrors({ err: true });
      }
    } else {
      passwordConfirmControl.setErrors({ passwordMismatch: true }); // Eşleşmiyorsa hata ayarla
    }
  }
  get component() {
    return this.form.controls;
  }
  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
   user.nameSurname= user.nameSurname.trim()
   user.userName= user.userName.trim()
   const result:Create_User= await this.userService.create(user);
   if(result.succeeded){
      this.toastService.message(result.message,"Kullanıcı kaydı başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight,
      })
   }else{
    this.toastService.message(result.message,"Hata",{
      messageType:ToastrMessageType.Error,
      position:ToastrPosition.TopRight
    })
   }
  }
}
