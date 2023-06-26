import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError, zip } from 'rxjs';

import {
  CreateProductDTO,
  UpdateProductDTO,
  Product,
} from '../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}`;
  /* private apiUrl = `https://young-sands-07814.herokuapp.com/api/products`; */

  constructor(private http: HttpClient) {}

  getByCategory(categoryId:string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  //Los parámetros son opcionales
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() }).pipe(
      retry(3),
      map((products) => {
        return products.map((item) => {
          return {
            ...item,
            taxes: 0.19 * item.price,
          };
        });
      })
    );
  }

/*   fetchReadAndUpdate(id: string, dto:UpdateProductDTO){
    return zip(
      this.getProductById(id),
      this.updateProduct(id, dto)
    )
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    })
  } */

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(
            () => new Error('Algo está fallando en el componente')
          );
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No estás autorizado'));
        }
        return throwError(() => new Error('Algo salió mal'));
      })
    );
  }

  getProductByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit, offset },
    });
  }

  createProduct(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  updateProduct(id: string, changes: UpdateProductDTO): Observable<Product> {
    console.log('id', id);
    console.log('changes ', changes);
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, changes);
  }

  /*   updateProduct(id: string, changes: Partial<Product>) {
    return this.http.patc<Product>(`${this.apiUrl}/${id}`, changes);
  } */

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
