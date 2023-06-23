import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apirUrl = `${environment.API_URL}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset ){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      /* params = params.append('offset', offset); */
    }
    return this.http.get<Category[]>(this.apirUrl, {params});
  }
}
