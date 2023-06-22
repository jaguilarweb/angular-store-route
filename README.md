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



### Rutas con parámetros

Para crear rutas con parámetros, se debe especificar en el path el nombre del parámetro entre dos puntos, por ejemplo:

```ts
{
  path: 'category/:id',
  component: CategoryComponent
},
```

Luego, en el componente que se va a utilizar, se debe importar ActivatedRoute, para poder acceder a los parámetros de la ruta.

```ts
import { ActivatedRoute } from '@angular/router';
```

Y luego, en el constructor, se debe inyectar el servicio ActivatedRoute

```ts
constructor(private route: ActivatedRoute) { }
```

Para acceder a los parámetros de la ruta, se debe utilizar el método params, que devuelve un observable, por lo que se debe suscribir para obtener el valor.

```ts
this.route.params.subscribe(params => {
  console.log(params.id);
});
```

Evitar los subscribe anidados Ejm:

```ts
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
  ```

  Para resolver lo anterior y evitar los call hell, podemos utilizar el switchMap:

  ```ts
    ngOnInit(): void {
    //Uso este suscribe cuando me envían la id en el parametro.
    this.route.paramMap
    .pipe(
      switchMap( params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return []
      })
    )
    .subscribe((data) => {
      this.products = data;
    })
  }
  ```
