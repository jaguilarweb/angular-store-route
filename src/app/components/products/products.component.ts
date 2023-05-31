import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen!: Product;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //Puede ir acá porque no es es async.
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    //Petición async
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProductById(id).subscribe((data) => {
      console.log('detail ', data);
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  onAddProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      price: 100,
      description: 'This is a new product',
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
    }
    this.productsService.createProduct(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }
}
