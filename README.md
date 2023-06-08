<p align="center">
  <a href="http://angular/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200" alt="Angular Logo" /></a>
</p>

# Curso de Consumo de APIs REST con Angular

## Descripción

Este proyecto se deasarrolla en el marco del Curso de Consumo de APIs REST con Angular de Platzi, que usa como base el proyecto creado en el Curso de Angular: Componentes y Servicios.

El proyecto corresponde al Frontend de una tienda digital usando Angular.

## Herramientas

- Node
- Angular
- [Api externa](https://young-sands-07814.herokuapp.com/api/products)
- [imagenes aleatorias](https://placeimg.com/640/480/any)
- Postman

## Solicitudes HTTP

Para comenzar a trabajar con las solicitudes Http en Angular, necesitaremos verificar que tengamos importado el módulo HttpClientModule de Angular.

### GET

- Obtener todos los productos
- Obtener un producto

En products service tenemos creada una llamada a la api, para obtener los productos de una api anterior, por tanto, modificamos la url para utilizar la nueva api.

Por otra parte, tenemos que hacer las adaptaciones necesarias para la forma en que envía la información la nueva api. Por tanto, ahora debemos modificar nuestro tipado en Models.

Uno de los cambios que vemos es el caso de categoy, que inicialmente la reciviamos como string. Ahora debe recibir un objeto de tipo category.
Una estrategia para enfrentar este cambio, es crear una nueva interfaz con el tipado de cotegory (en el mismo archivo para este ejemplo).


Para obtener el detalle de un producto incorporamos elementos a la vista de product que será un menú lateral retráctil.

Vamos a utilizar la librería swiper y para efectos de seguir el curso incluiremos la version 8, ya que la versión actualizada ya no tiene soporte para componentes de Angular.

Para instalar la versión 8 de swiper, ejecutamos el siguiente comando:

```bash
npm install swiper@8.4
```

En estricto rigor podriamos utlizar cualquier otra librería, por ejemplo:

- Bootstrap (versión ngbootstrap componentes)

### POST

Para crear productos, partimos creando el método createProduct en nuestro respectivo servicio.
Y luego creamos en el componente el endpoint, en este caso los estamos creamdo en products.component.


### DTO: Data Transfer Object

No siempre cohincide con los datos de nuestro modelo de la base de datos.
Por tanto, en lugar de utilizar el DTO en el servicio, utilizaremos un DTO en el componente.

Ejemplo: Cuando modelamos la interfaz para tipar nuestro objeto, en este caso product, incorporamos como atributo la id. No obstante, durante el desarrollo cuando queremos elaborar métodos y necesitamos enviar la data tipada, al emplear la interfaz del modelo para tipar nos exigirá que instanciemos el nuevo objeto incorporando todos los atributos señalados en la interfaz del modelo incluida en este caso la id. El problema es que regularmente la id no la asignaremos manualmente, sino que será asignada por la base de datos cuando se cree el objeto y se guarde en ella. Por tanto, antes de que se guarde el objeto y mientras desarrollamos no tenemos la id del nuevo objeto, que paradojicamente solicita esa id para crearse.
Para resolver esta disyuntiva es que nos sirven los DTO, ya que nos permite tipar el objeto pero con una deseada flexibilidad para incorporar o no atributos que están reflejados en el modelo. De este modo, al crear el DTO nos permite tipar el objeto sin que este me exija la id pero me sigue ayudando con el tipado de los otros atributos.

En este caso, el DTO lo creamo en el mismo archivo del modelo.
Así tenemos en primera instancia la interfaz del producto, y luego creamos una interfaz (dto) especial para el el objeto con el cual se creará un producto propiamente tal. Así en el ejemplo que sigue, luego del Producto tenemos la interfaz CreateProductDTO:

```typescript
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO {
  title: string;
  price: number;
  images: string[];
  description: string;
  categoryId: number;
}
```

Ahora, con la finalidad de evitar repetir tantos atributos similares entre las interfaces solemos utilizar una técnica que es extender el comportamiento de una clase a otra y utilizar el Omit, señalando los atributos que omitiremos, y tambiñen podemos señalar un atributo nuevo que requeriremos. Por ejemplo, en este caso para crear solo necesitamos la id de la categoría. No obstante, en el modelo usabamos un objeto categoría.

```typescript
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
```

Luego seguimos la misma lógica con todas las peticiones http, creando los métodos en el servicio para recibir dichas peticiones:

- createProduct
- updateProduct
- deleteProduct
- getAllProducts
- getProductById

### Paginación (Parámetros URL)

Para implementar paginación, utilizaremos la técnica del limit y offset.

- limit: cantidad de elementos que queremos obtener
- offset: cantidad de elementos que queremos saltar

Para ello, en el servicio creamos un método que reciba estos parámetros y los envíe a la api.

```typescript
    getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
  }
```

## Observables vs Promesas

### Observables:

- Omitir / responder varias respuestas
- Stream de datos, transmisión de muchos datos
- Permite hacer transformaciones de datos y cancelar la subscripción
- Permite transformar la respuesta (pipes)
- Es posible escuchar constantemente : eventos / responsive / fetchs


### Promesa :

- Retorna una única respuesta
- Solo se ejecuta una vez
- Simplicidad
