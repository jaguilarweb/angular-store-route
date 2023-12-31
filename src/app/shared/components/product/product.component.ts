import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  /* @Input() product!: Product; */
  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();

  constructor() {
   }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showDetail.emit(this.product.id);
  }

}
