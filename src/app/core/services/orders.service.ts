import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    private readonly _HttpClient= inject(HttpClient);
    myHeader: any = {token: localStorage.getItem('userToken')};

    checkout(cartId: string, shippingDetails: object):Observable<any>{
     return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://http://localhost:51207`,
      {'shippingAdress':shippingDetails},
      {
        headers: this.myHeader
      }
     )
    }


}
