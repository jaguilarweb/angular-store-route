import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[]=[];
  total: number = 0;
  products: Product[] = [
    { id: '1', name: 'Product Name 1', image: './assets/images/toy.jpeg', price: 100 },
    { id: '2', name: 'Product Name 2', image: './assets/images/bike.jpeg', price: 100 },
    { id: '3', name: 'Product Name 3', image: './assets/images/books.jpeg', price: 100 },
    { id: '4', name: 'Product Name 4', image: './assets/images/glasses.jpeg', price: 100 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product) {
    console.log(product);
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
