import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();
  myShoppingCart: Product[] = [];
  total: number = 0;
  showProductDetail = false;
  productChosen!: Product;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //Puede ir acá porque no es es async.
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProductById(id).subscribe((data) => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg)
      this.statusDetail = 'error';
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

  onUpdateProduct(id: string) {
    const changes: UpdateProductDTO = {
      title: 'Product Updated',
      price: 200,
    }
    //const id = this.productChosen.id;

    this.productsService.updateProduct(id, changes).subscribe((data) => {
      console.log(data);
      const index: number = this.products.findIndex((product) => product.id === id);
      this.products[index] = data;
      this.productChosen = data;
    });
  }

  onDeleteProduct(id: string) {
    //Elimina el objeto de la base de datos
    this.productsService.deleteProduct(id).subscribe(() => {
      const index: number = this.products.findIndex((product) => product.id === id);
      //Elimina y actualiza la interfaz gráfica
      this.products.splice(index, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore(){
    this.loadMore.emit();
  }

}
