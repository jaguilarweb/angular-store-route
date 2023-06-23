import { Category } from "./category.model";

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

//nuevo atributo taxes, opcional, no va a ser enviado desde el backend,
//sino que será calculado desde el frontend.

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
