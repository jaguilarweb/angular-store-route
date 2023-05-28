import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  products: Product[] = [
    { id: '1', name: 'Product Name 1', image: './assets/images/toy.jpeg', price: 100 },
    { id: '2', name: 'Product Name 2', image: './assets/images/toy.jpeg', price: 100 },
    { id: '3', name: 'Product Name 3', image: './assets/images/toy.jpeg', price: 100 },
    { id: '4', name: 'Product Name 4', image: './assets/images/toy.jpeg', price: 100 },
  ];

  onLoaded(img: string) {
    console.log('Log Padre ', img);
  }
}
