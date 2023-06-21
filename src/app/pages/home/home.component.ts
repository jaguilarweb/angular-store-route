import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    //Petición async
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        console.log(data);
        this.products = data;
        this.offset += this.limit;
      });
  }
}
