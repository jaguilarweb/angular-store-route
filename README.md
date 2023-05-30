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

### POST
