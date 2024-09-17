import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/intefaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService= inject(CartService);
  cartData: Icart={} as Icart


  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.cartData= res.data
        
      },

      error: (res)=>{
        console.log(res);
        
      }
    })
  }

  clearItems():void{
    this._CartService.ClearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if (res.message=='success') {
          this.cartData= {} as Icart;
          
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteProduct(id:any):void{
    this._CartService.deleteItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateQuantity(id:any, newCount: number):void{
    this._CartService.updateQuantity(id, newCount ).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData= res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
