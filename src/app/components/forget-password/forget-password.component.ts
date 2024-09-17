import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _AuthService= inject(AuthService)
  private readonly _router= inject(Router)
  step:number=1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })


  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })

  resetPassword: FormGroup = new FormGroup({
    resetPassword: new FormControl(null, [Validators.required])
  })

  step1Verify():void{
    this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.statusMsg==='success') {
          this.step=2;
        }
        
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  step2Code():void{
    this._AuthService.TypeCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.statusMsg==='success') {
          this.step=3
          
        }
        
      },

      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  step3Code():void{
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData()
        this._router.navigate(['/home'])
        
      },

      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
