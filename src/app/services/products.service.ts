import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CreateProductDTO, UpdateProductDTO, Product } from '../models/product.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

/*   getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  } */

  //Los parámetros son opcionales
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3)
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
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

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
