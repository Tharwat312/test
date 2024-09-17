import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myHeader: any = {token: localStorage.getItem('userToken')};

  private readonly _HttpClient= inject(HttpClient);


  addProductToCart(id:string): Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`, {
      "productId": id
  },
{
  headers: this.myHeader
})
  }

  getProductsCart(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`,
      {
        headers: this.myHeader
      }
    )
  }


  ClearCart(): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`,
      {
        headers: this.myHeader
      }
    )
      
  }

    deleteItem(id:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`,
      {
        headers: this.myHeader
      }
    )
      
  }

  updateQuantity(id:string, newCount:number): Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${id}`,
      {
        "count": newCount
    },
    {
      headers: this.myHeader
    }
    )
      
  }



}
