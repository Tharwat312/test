import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _productService= inject(ProductsService);
  private readonly _categoriesService= inject(CategoriesService)
  private readonly _CartService= inject(CartService);
  private readonly _toastr= inject (ToastrService)

  ProductList:Iproduct[]=[]
  categoriesList: Icategories[]=[]
  ProdSub!:Subscription
  sItem: string= ''

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['<', '>'],
    items:1,
    
  }

  ngOnInit(): void {

    this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log("cat",res.data);
        this.categoriesList= res.data
        
      },

      error:(err)=>{
        console.log(err);
        
      }
    })




   this.ProdSub= this._productService.getAllProducts().subscribe({

      next:(res)=>{
        console.log(res.data);
        this.ProductList=res.data
      },
      error: (err)=>{
        console.log(err.data);
        
      }
    })
  }



  ngOnDestroy(): void {
    this.ProdSub?.unsubscribe()
  }


  addToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({

      next:(res)=>{
        console.log(res);
        this._toastr.success(res.message, "stop n' shop")
        
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
    
    
  }
}


