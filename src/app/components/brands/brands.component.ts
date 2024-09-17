import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ibrands } from '../../core/interfaces/ibrands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
 private readonly _BrandsService= inject(BrandsService);

 brands: ibrands[]=[]


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
   
  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brands= res.data
      
    },

    error: (err)=>{
      console.log(err);
      
    }
  })
 }



}
