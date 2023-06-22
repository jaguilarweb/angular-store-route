import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    //Uso este suscribe cuando me envían la id en el parametro.
    this.route.paramMap.subscribe(params => {
      //el nombre 'id' debe coincidir con el nombre del parametro de la url en el app-routing
      //En este caso 'category/:id'.
      this.categoryId = params.get('id');
      if(this.categoryId){
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe( data => {
          this.products = data;
        })
      }
    })
  }

}
