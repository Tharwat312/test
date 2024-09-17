import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly _HttpClient = inject(HttpClient) 
userData:any =null;
_router = inject(Router)

setRegisterForm(data:object): Observable<any>
{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
}

setLoginForm(data:object): Observable<any>
{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
}

saveUserData():void{
  if(localStorage.getItem('userToken')!==null){
    this.userData= jwtDecode(localStorage.getItem('userToken')!),
    console.log('userData', this.userData);
    
  }
}

logOut():void{
  localStorage.removeItem('userToken');
  this._router.navigate(['/login'])
  
}


verifyEmail(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data)
}


TypeCode(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data)
}

resetPassword(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
}



}







