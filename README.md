<p align="center">
  <a href="http://angular/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200" alt="Angular Logo" /></a>
</p>

# Curso de Angular Router: Lazy Loading y Programación Modular

## Descripción

Este proyecto se deasarrolla en el marco del Curso de Angular Router: Lazy Loading y Programación Modular de Platzi, que usa como base el proyecto creado en el Curso de Consumo de APIs REST con Angular.

El proyecto corresponde al Frontend de una tienda digital usando Angular.

## Herramientas

- Node
- Angular
- [Api externa](https://young-sands-07814.herokuapp.com/api/products)
- [Api externa Actualizada](https://fakeapi.platzi.com/en/rest/users)
- [imagenes aleatorias](https://placeimg.com/640/480/any)
- Postman

## Creando Rutas

### Rutas y Componentes

Se puede enlazar componentes a las rutas para cuando se ingrese una ruta determinada, se muestre un componente específico.

Para estos fines en primer lugar vamos a crear páginas, las cuales vamos a crear en un directorio llamado 'pages',
Es importante, aislar las páginas de los componentes, ya que las páginas estarán conectadas a un routing y los componentes que podemos utilizar en varias páginas.

Páginas a crear:
- ng g c pages/home
- ng g c pages/notFound
- ng g c pages/category
- ng g c pages/mycart
- ng g c pages/login
- ng g c pages/register
- ng g c pages/recovery
- ng g c pages/profile

Una vez creadas vamos a asegurarnos que en app.component.html esté la directiva <router-outlet></router-outlet>

Y luego, en app-routing importaremos todos los compoenetes correspondientes con las páginas que creamos, para luego agregar el routing.

Ejemplo para home:

```ts
import { HomeComponent } from './pages/home/home.component';
...
const routes: Routes = [
  ...
  {
    path: 'home',
    component: HomeComponent
  },
  ...
];
```

#### Home

Detalle que parece importante resaltar:

PathMatch se utiliza para especificar cómo se debe hacer la coincidencia de la ruta. Hay dos opciones:

full: la ruta se considera coincidente si el resto de la URL coincide con la ruta especificada.

prefix: la ruta se considera coincidente si la URL comienza con la ruta especificada.
