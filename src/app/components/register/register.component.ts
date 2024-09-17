import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService= inject(AuthService)
  private _Router=inject(Router)
  errorMsg:string=""
  loading:boolean=false
  msgSuccess:boolean=false

  //create form group
  registerform:FormGroup= new FormGroup({
    name: new FormControl (null,[Validators.required, Validators.minLength(3)] ),
    email: new FormControl (null, [Validators.required, Validators.email]),
    password: new FormControl (null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl (null),
    phone: new FormControl (null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPW)

  test():void{
    if(this.registerform.valid){
      this.loading=true;
      this._AuthService.setRegisterForm(this.registerform.value).subscribe({
        next:(res)=>{
          this.loading=false;
          console.log(res);
          if(res.message=='success'){
            setTimeout(() => {
              this._Router.navigate(['/login'])

            }, 1000);
            this.msgSuccess=true
          }
          
        },
        error:(err)=>{
          this.errorMsg=err.error.message
          this.loading=false;
          console.log(err);

          
        }
      })
      console.log(this.registerform);

    }
  }

  confirmPW(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null
    }else
    {
      return {mismatch:true}
    }
  }


}
