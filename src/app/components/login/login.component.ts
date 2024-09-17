import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';
import { AuthService } from '../../core/services/auth.service';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService=inject(AuthService)
  loading:boolean= false
  private _Router= inject(Router)

  loginForm: FormGroup= new FormGroup({
    email: new FormControl (null, [Validators.required, Validators.email]),
    password: new FormControl (null, Validators.required),
  })

  loginn(): void{
    this.loading=true
    this._AuthService.setLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.loading=false
        if(res.message=='success'){
          setTimeout(() => {

            localStorage.setItem('userToken', res.token);
            this._AuthService.saveUserData();

            this._Router.navigate(['/home'])

          }, 1000);
          
        }
        
      },
      error:(err)=>{
        console.log(err);
        this.loading=false
      }
    })
    
    console.log(this.loginForm);
    
  }

}
