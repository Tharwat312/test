import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductsService);
  private readonly _CartService= inject(CartService)


  productDetails: Iproduct | null =null


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p)=>{
        let productId= p.get('id')

        console.log(productId);

        this._productService.getSpecificProducts(productId).subscribe({
          next: (res)=>{
            console.log(res.data);
            this.productDetails= res.data
            
          },

          error: (err)=>{
            console.log(err);
            
          }
        })


        

      }
    })
  }

  addToCart(id:any):void{
    this._CartService.addProductToCart(id).subscribe({

      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
    
    
  }

}
