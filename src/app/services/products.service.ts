import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, UpdateProductDTO, Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  updateProduct(id: string, changes: UpdateProductDTO): Observable<Product> {
    console.log('id', id);
    console.log('changes ', changes)
    return this.http.put<Product>(`${this.apiUrl}/${id}`, changes);
  }

/*   updateProduct(id: string, changes: Partial<Product>) {
    return this.http.patc<Product>(`${this.apiUrl}/${id}`, changes);
  } */

}
