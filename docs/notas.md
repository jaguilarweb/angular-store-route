# Curso de Angular: Componentes y Servicios

Crear el proyecto.

```ng new project-name```

## Componentes

Un componente es una pieza de software con una responsabilidad única y una estructura y funcionalidad determinada, además de ser reutilizable.

Es una manera de dividir tu aplicación de una forma escalable para no tener todo en un solo archivo. Por ejemplo, un componente para el header, otro para el footer, uno más para el menú, etc.

Puedes crear tu primer componente en Angular utilizando el comando 

```ng generate component folder-name/component-name```

o en su forma corta ```ng g c test-name ```

Los componentes solo pueden pertenecer a un solo módulo. Es decir aparecerá en app.module.

## Decoradores

Los decoradores alteran el comportamiento de una clase en Angular, para que el compilador de TypeScript interprete el código de la manera correcta y sepa que una clase es:

- un componente,
- un módulo,
- un servicio,
- una directiva, etc.

Este decorador es quién enlaza el componente con el archivo HTML y la hoja de estilos, además le otorga al componente un selector o un nombre para utilizarlo en tus templates.

## Tipos de comunicación

### String Interpolation {{}}
String interpolation es la manera de enviar datos desde nuestro componente hacia la vista. Utilizando el doble símbolo de llaves {{ }}, o también conocidos como brackets, puedes imprimir el valor de una variable, realizar operaciones matemáticas o hacer el llamado a una función dentro del código HTML.

### Property Bindin []
Property Binding es la manera que dispone Angular para controlar y modificar las propiedades de los distintos elementos de HTML. Para esto, simplemente utiliza los corchetes [] para poder modificar dinámicamente ese atributo desde el controlador.

 Utilidades

- El atributo **src** de la etiqueta <img> para modificar dinámicamente una imagen.
- El atributo **href** de un <a> para modificar un enlace.
- El atributo **value** de un <input> para autocompletar un valor de un formulario.
- El atributo **disable** de un <input> para habilitar/deshabilitar un campo de un formulario.

Es decir, inicialmente puedo tener un atributo en el html, pero tengo que darle un valor fijo a este atributo. Ejm:

<button disabled="false"></button>

Si quiero darle un valor dinámico que pueda ser controlado desde la lógica, debería crear una propiedad en el controlador del componente. Ejm:

app.component.ts

```
export class AppComponent {
  btnDisabled= true;
}
```

Y luego en el html aplicacmos el binding

<button [disabled]="btnDisabled"></button>

Lo anterior me permite poder crear valores como objetos y recuperarlos de esa forma. Ejm:

[value] = "person.name"

### Event Binding ()

Al igual que el Property Binding nos permite modificar el valor de los atributos de los elementos HTML desde el controlador, el Event Binding permite controlar los eventos que suceden en estos elementos. El clic de un botón, detectar cambios en un campo, el envío de un formulario, entre otros eventos. Para esto utiliza los paréntesis () para el bindeo de la propiedad del elemento.

evento = función

html
<button (click)="toggleButton()">Toggle Button</button>

app.component.ts

```
export class AppComponent {
  toggleButton() {
    this.btnDisabled = false;
  }
}
```

Además del evento clic, seguramente el más utilizado, hay otros eventos como el change para detectar cambios en un campo de formulario, el evento scroll para detectar el desplazamiento horizontal/vertical del usuario en el navegador, onKeyUp o onKeyDown para detectar cuando el usuario aprieta o deja de apretar un botón de su teclado.

La importancia del Event Binding en Angular está dada por la posibilidad de comunicar el componente y la vista, el código TS con el código HTML, intercambiando datos entre ellos.

Puedes enviarle al controlador el evento completo que se produce en la vista. Para esto, solo declara un parámetro $event en el método que se encuentra escuchando el evento.

Tienes en el controlador:

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  buttonClick($event: Event) {
    console.log($event);
  }
}
```
Y en el HTML:

<button (onKeyUp)="buttonClick($event)">

El método buttonClick() que recibe como parámetro $event del tipo Event, en el HTML bindea el evento onKeyUp y el método recibe argumento $event con el símbolo de pesos delante para que Angular entienda que se trata de un evento.

De esta manera, puedes registrar cada pulsación del teclado imprimiendo por consola el evento producido por el usuario.

### Data Binding [()]

El atributo ngModel permite el intercambio de datos de forma bidireccional entre el componente y la vista. Lo que suceda en el componente, se verá reflejado en la vista. Lo que se suceda en la vista, inmediatamente impactará en el componente.

<input [(ngModel)]="name">

Si no quieres la bidirección, solo colocamos los corchetes [ngModel] para que la comunicación sea unidireccional.

Para utilizar ngModel, es necesario hacer uso e importar Angular Forms en archivo app.module.ts que es el módulo principal de toda aplicación Angular.

De esta manera puedes importar el módulo FormsModule desde @angular/forms y agregarlo a imports para emplear la propiedad [(ngModel)]

### Comunicación entre componentes

#### @Input (Parent "el que contiene" ----->> Child = "El contenido")

Para comunicar componentes, Angular hace uso de decoradores para intercambiar información entre un componente padre hacia un componente hijo y viceversa.

Comunicando componentes
Para enviar información de padre a hijo, puedes utilizar el decorador @Input() para marcar una propiedad de una clase como punto de entrada de un dato.

Ejm:

app.root
    - app.img

Ojo: <ng-template>

Para utilizar estructuras condicionales podemos hacer uso de directivas como *ngIf, *ngSwitch, *ngFor.

<div *ngIf="isPlatzi; else templateElse">Hola, soy Platzi</div>

No obstante, cuando queremos hacer uso de "else" en Angular, la sintaxis es algo especial. Debes crear un template en tu código HTML usando la etiqueta que provee Angular llamada <ng-template> con una Variable de Template, comenzando con #, para hacer referencia a este elemento desde tu If.

<div *ngIf="isPlatzi; else templateElse">Hola, soy Platzi</div>
<ng-template #templateElse>
    <div>No soy Platzi</div>
</ng-template>

#### @Output (Parent "el que contiene" <<------ Child = "El contenido")

A partir de la emisión de un evento, el decorador @Output() permite enviar mensajes desde un componente hijo hacia el padre.

Para ver este caso, se trabaja en el html del componente img.component, que es hijo de app.component.

En este caso se busca identificar cuando al buscar una imagen, y si tiene contenido pero no se encuentra (error404). Para ello se utiliza un evento llamado error.

El evento error está en el html del hijo, siendo escuchado por el controlador hijo. Cuando se produce el evento, el hijo detecta el evento y envía la información al padre.

html hijo

<img (error)="imError()" [src]="img" *ngIf="img; else elseImg">

  <ng-template #elseImg>
  <img [src]="imageDefault">
  </ng-template>

Controlador hijo

```
export class ImgComponent {
  @Input() img:string = '';
  imageDefault = 'xxxxx/default.png'

  imgError() {
    this.img = this.imageDefault;
  }
}
```
Luego de lo anterior, queremos hacer la comunicación del padre para avisar que se hizo la carga.

##### Emitiendo desde el hijo

html hijo

<img (load)="imgLoaded()" (error)="imError()" [src]="img" *ngIf="img; else elseImg">


Controlador hijo

Debemos importar **Output** y con ello **EventEmitter**, ambos desde @angular/core.

```
export class ImgComponent {
  @Output() loaded = new EventEmmiter<string>();

  imgLoaded() {
    console.log('Log hijo')
    this.loaded.emit('envio una string porque así lo defini antes en el event emmiter')
  }
}
```

Puedo enviar distintos tipos de datos:

EventEmmiter<string>();
EventEmmiter<number>();
EventEmmiter<object>();

Por tanto, debo ser coherente con los datos que emito:

this.loaded.emit('Enviar estring')
this.loaded.emit(12345)
this.loaded.emit({ })

##### Escuchando desde el Padre
Asumiendo que <app-component> es el padre:

HTML Padre
<app-component>
  <app-img 
    (loaded)="onLoaded($event)" // Recibe del hijo
    [img]= "imgParent" // Envia info al hijo
    > 
  </app-img>
</app-img>

Controlador padre

```ts
export class AppComponent {
  imgParent = ''

  onLoaded(img: string) {
    console.log('Log Padre, img')
  }
}
```

Con $event envío toda la información del evento.

### Componente Product

Hemos definido un modelo product, para el componente product. El modelo se encuentra en la carpeta "Models" => "product.model.ts".

Para recibir un objeto product en el controlador del componente, el cual sea enviado por el padre (mediante Input), debemos inicializarlo con valores.

Si queremos inicializarlo vacio, tendríamos que modificar el modelo y definir que todos los atributos son opcionales, para ello deberiamos agregar un signo de interrogación en cada atributo del modelo:

```ts
export interface Product {
  id?: string;
  price?: number;
  title?: string;
}
```

Así en el controlador quedaría:
`@Input() product: Product = {};`

Lo anterior no es una buena práctica porque la finalidad de establecer el modelo es justamente que pueda detectar errores al no agregar los atributos.

Por tanto, lo mejor sería inicializar los atributos con valores vacios.

```ts
@Input() product: Product = {
  id: '',
  price: 0,
  title:''
};
```

Si quisiera enviar una variable con un nombre diferente al regular debería enviarlo de la siguiente forma:

HTML
<app-product [my-product]="product">
</app-product>

Controlador
```ts
@Input('my-product') product: Product = {
  id: '',
  price: 0,
  title:''
};
````



