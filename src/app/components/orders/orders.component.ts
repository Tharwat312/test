import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

orders: FormGroup = new FormGroup({
  details: new FormControl (null),
  phone: new FormControl (null),
  city: new FormControl (null),
})

cartId: any = "" ;

private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _OrdersService = inject(OrdersService)



ngOnInit(): void {

  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
        this.cartId = params.get('id');
        console.log(params);
        
    }
  })
  
}

submitOrder():void{
  console.log(this.orders.value);

  this._OrdersService.checkout(this.cartId, this.orders.value).subscribe({
    next: (res)=>{
      console.log(res);
      if (res.status==='success') {
        window.open(res.session.url)
        
      }
      
    },

    error: (err)=>{
      console.log(err);
      
    }
  })
  
}
}
