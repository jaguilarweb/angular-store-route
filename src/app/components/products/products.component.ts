import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
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

  //Para avanzar por las páginas dinámicamente
  limit = 10;
  offset=0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    //Puede ir acá porque no es es async.
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    //Petición async
    this.productsService.getAllProducts(this.limit, this.offset).subscribe((data) => {
      console.log(data)
      this.products = data;
      this.offset += this.limit;
    });
/*     this.productsService.getProductByPage(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    }); */
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
      //Esta estructura me permite visualizar el manejo de errores que venga del backend.
      //console.log(response.error.message);
      window.alert(errorMsg)
      this.statusDetail = 'error';
    });
  }

  // Obtener un producto y actualizarlo consecutivamente
  // Usando switchmap
  readAndUpdate(id: string) {
    this.productsService.getProductById(id)
    .pipe(
      switchMap((product) => this.productsService.updateProduct(product.id, {title: 'change'})),
    )
    .subscribe(data => {
      console.log(data);
    })
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe((response: any) => {
      const read = response[0];
      const update = response[1];
    })
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

  loadMore(){
    this.productsService.getProductByPage(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
