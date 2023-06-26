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

### RouterLink and RouterActived

Para crear links a las rutas, se utiliza la directiva routerLink, que se puede utilizar en un elemento a, o en un elemento li, por ejemplo:

```html
<li class="nav-item">
  <a class="nav-link" routerLink="/home">Home</a>
</li>
```

Para agregar clases a los elementos que estén activos, se utiliza la directiva routerLinkActive, que se puede utilizar en un elemento a, o en un elemento li, por ejemplo:

```html
<li class="nav-item" routerLinkActive="active">
  <a class="nav-link" routerLink="/home">Home</a>
</li>
```

Podemos crear una página y redireccionar al navegador cuando no se encuntra un recurso.
Para lo anterior debemos crear la ruta en el app-routing:

```ts
{
  path: '**',
  redirectTo: 'not-found'
},
```

Y luego, en el componente not-found, podemos agregar un botón para redireccionar a la página de inicio:

```html
<div class="container">
  <div class="row">
    <div class="col-12 text-center">
      <h1>404</h1>
      <p>La página que buscas no existe</p>
      <button class="btn btn-primary" routerLink="/home">Ir a la página de inicio</button>
    </div>
  </div>
</div>
```

También podemos enrutar hacia el componente nonFound:

```ts
{
  path: '**',
  component: NonFoundComponent
},
```

#### Página de detalle de producto

Para crear la página de detalle de producto, se debe crear un componente, por ejemplo:

```ts
ng g c pages/product-detail
```

Luego, se debe crear la ruta en el app-routing:

```ts
{
  path: 'product/:id',
  component: ProductDetailComponent
},
```

Y luego, en el componente, se debe importar ActivatedRoute, para poder acceder a los parámetros de la ruta.

```ts
import { ActivatedRoute } from '@angular/router';
```

Y luego, en el constructor, se debe inyectar el servicio ActivatedRoute

```ts
constructor(private route: ActivatedRoute) { }
```

Para acceder a los parámetros de la ruta, se debe utilizar el método params, que devuelve un observable, por lo que se debe suscribir para obtener el valor.

```ts
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProductById(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.product = data;
      });
  }
  ```

Esto nos permite poder compartir el enlace y acceder mediante este al detalle del producto.

Cuando queremos volver 'hacia atrás', podemos incluir un botón que utilice la feature de angular/common llamada 'Location':

```ts
import { Location } from '@angular/common';
...
constructor(private location: Location) { }
...
  goBack(): void {
    this.location.back();
  }
```

Y en el html:

```html
<button class="btn btn-primary" (click)="goBack()">Volver</button>
```

### Parametros URl (opcionales)

Estos parametros acompañan a la url, ejemplo de url con 2 parámetros:

http://localhost:4000/products?page=1&limit=5

Los parametros, de esta url son:
- page : número de página que se quiere mostrar
- limit : cantidad máxima

Los páramteros en la url son opcionales y sriven para crear:

- Rutas dinámicas
- Rutas con parámetros opcionales
- Rutas con parámetros de consulta

Casos de uso para lo anterior son la creación de:

- Paginador
- Buscadores
- Búsqueda avanzada
- Filtros

Esta implementación la haremos en el proyecto para permitir compartir el enlace y que cuando accedamos a él, el producto que esté definido por su id en el parámetro esté desplegado y abierto en nuestro home.


### LazyLoading & CodeSplitting

LazyLoading es una técnica que permite cargar los módulos de forma dinámica, es decir, cuando se necesiten.
Esto ayuda a reducir el tamaño final del bundle ya que no importamos todos los módulos al inicio de la aplicación.

El CodeSplitting es un concepto relacionado al lazyloading, donde se divide el código del proyecto en módulos más pequeños, para que el navegador solo cargue el código que se necesita en
ese momento.

#### Programación Modular

**Tipos de Módulos en Angular**
Podemos identificar varios tipos de módulos. El AppModule es el módulo raíz que da inicio a tu aplicación. Existen los Routing Modules para la definición de rutas.

El Shared Module que posee servicios o componentes compartidos por toda la aplicación. El Feature/Domain Module que son módulos propios de tu aplicación.

De esta manera, Angular construye un ecosistema de módulos, pudiendo dividir una APP en N partes para optimizar el rendimiento y mantener un orden en el código fuente para que sea comprensible y escalable.

- Root Module: modulo por defecto de angluar
- Core Module: son servicios que pueden ser usados en diferentes módulos y componentes recordar que los servicios que se inyecta en el provideIn : ‘root’ se puede usar en cualquier parte (instancia global).
- Routing Module: son módulos especiales que declaran un enrutamiento de la aplicación
- Feature Domain Module:son los módulos específicos del negocio
- Shared Module:Se usan para componentes pipes y directivas que se quieran usar en toda la aplicación


Para llevar nuestra aplicación a una estructura modular crearemos la carpeta website e incorporaremos:
- componentes
- directivas
- pages
- pipes

Revisar que las importaciones estén sin problemas.

Ahora hacemos una modificación del app-routing.

```ts
const routes: Routes = [
  /*   { path: '', redirectTo: '/home', pathMatch: 'full' }, */
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'my-cart', component: MyCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
```

Rutas anidadas

Al configurar que la ruta principal cargue el layout y este tenga hijos, habilitamos la posibilidad que website pueda tener su propio layout, por tanto, tambiñen podremos agregar nuevos módulos que podrán tener su propio layout.

Si creamos ahora un módulo de administración llamado cms, podemos crear rutas anidadas y que tenga su propia layout.

En el módulo del CMS, creamos el archivo de rutas en ellas escribimos lo siguiente:

```ts
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: 'tasks', component: TasksComponent },
      { path: 'grid', component: GridComponent },
    ]
  }
];
```

Ahora en el navegador podemos acceder mediante la siguiente url:

http://localhost:4200/cms/grid


Con todo lo anterior, podemos tener un renderizado diferente de los componentes que tienen un layout para el website y otro para el CMS.


Transformar website en módulo

- Creamos el módulo
- transpasamos los componentes que, perteneciendo a website, quedaron incorporados en el app.module

##### Shared Module

Un módulo compartido se crea como cualquier otro módulo, solo que no tendrá routing.

Dentro de la carpeta Shared, creamos otras carpetas que son frencuentes, como components, pipes y directives.

Luego, cambiamos la ubicación de componentes que van a ser compartidos por la aplicación como por ejemplo, 'img', 'product' y 'products', los cuales incorporamos al interior de 'shared/components'.

Luego. hacemos lo mismo para los pipes y directivas que queremos compartir. Al hacerlo de esta forma podrán ser usados no solo en el módulo website, sino que también en cualquier modulo que lo importe.

En el archivo shared.module.ts, importamos los componentes, pipes y directivas que queremos compartir.

#### Precarga de módulos

En general, debemos considerar que cada módulo debe pasar por 4 estados que es la descarga, el Parse, Compilar y ejecutar.
Al separar la aplicación en diferentes módulos y aplicar el Lazy loading, podemos habilitar otras características como la precarga de módulos.

Para dar contexto podemos decir que con CodeSplitting hemos dividido el código, que antes se compilaba en un solo archivo main.js, en varios chunk (o bloques de código). Estos chunk mediante el lazyloading se van cargando a medida que los vamos requiriendo al hacer consultas al servidor hacia las url que están enrutadas en los archvios de routing y que se observan con la forma de 'loadchildren'. Estas rutas cargan los módulos a demanda.


Dividir, permite mejorar:
- La velocidad de carga de la aplicación
- La experiencia de usuario
- El rendimiento de la aplicación

Las desventajas de esta técnica:

- Se observa con conexiones lentas ya que al tener que cargar cada módulo, éste pasa por los cuatro estados pudiendo verse demorado este proceso.

Para mejorar la experiencia de usuario podemos utilizar la precarga de módulos en el background, lo que permite cargar los módulos en segundo plano, mientras el usuario navega por la aplicación. Es decir, se van cargando los módulos según se van a necesitar durante los tiempos de inactividad. Esta carga se inicia posterior a la primera carga inicial.

En el app-routing importamos el PreloadAllModules.

La técnica del PreloadAllModules, es beneficiosa para aplicaciones con pocos móduloo ya que se estaria ocupando el hilo principal del navegador.

Para una estrategia personalizada.

Creamos un servicio.



