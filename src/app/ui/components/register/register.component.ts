import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Minimum 8 karakter
          Validators.maxLength(40),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.,;])[A-Za-z\d@$!%*?&#.,;]+$/), // En az bir küçük harf, bir büyük harf, bir rakam ve bir özel karakter içermelidir
        ],
      ],
      repeatPassword: [
        '',
        [
          Validators.required,
        ],
      ],
    }, { validator:this.passwordMatchValidator});
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('repeatPassword');

    if (passwordControl.value === repeatPasswordControl.value) {
      repeatPasswordControl.setErrors(null); // Eşleşiyorsa hata yok
      if(passwordControl.errors){
        repeatPasswordControl.setErrors({err:true})
      }
    } else {
      
      repeatPasswordControl.setErrors({ passwordMismatch: true }); // Eşleşmiyorsa hata ayarla
    }
  }
  get component(){
   return this.form.controls
  }
  submitted:boolean=false
  onSubmit(data: User) {
    this.submitted=true;
    if(this.form.valid){
      console.log(data)
    }
     var c =this.form
     debugger
    
    return;
  }
}
