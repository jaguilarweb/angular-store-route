import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{



  @Input() img: string = '';

  //Con esta estrategia puedo identificar el input al cual quiero escuchar en caso de cambio:
/*   @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img', this.img)
    //Code
  } */

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './assets/images/default.png';
  counter = 0;
  counterFn : number | undefined;

  constructor() {
    //Before render -- once time (one instance each)
    //NO correr funciones Async
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Before - during render
    //Función que sí podemos usar pàra evaluar los cambios en inputs -- times
    //Simple changes me permite leer los cambios que se están produciendo en los inputs.
    console.log('ngOnChanges', 'imgValue => ', changes);
    console.log('changes ', changes);
    //Para evaluar los cambios en los input tengo 2 vías:
    // Primer método: Mediante un if, ir evaluando uno a uno (esto es recomendable con un input o dos)
    // - if(changes.){}
    // Segúndo método: Cuando quiero evaluar varios inputs:
    //Volver el input un set
    // - set changeImg(newImg: string) // Quedó implementado en el @Input

  }

  ngOnInit(): void {
    //Before render -- once time
    //Sí podemos usar Async - fetch (llamadas a apis)
    //Corre solo una vez, cuando se inicializa el componentes
    //No usar para evaluar cambios en los inputs.
    console.log('ngOnInit', 'imgValue => ', this.img);
/*     this.counterFn = window.setInterval(() => {
      this.counter++;
      console.log('run counter');
    }, 1000); */
  }

  ngAfterViewInit() {
    //After render
    //handler children
    //Lugar para hacer modificaciones a los elementos programáticamente(y no desde el tempalte),
    //ya que se ejecuta después que los elementos del htm están renderizados.
    //Comunmente usado con las directivas.
    console.log('ngAfterView');
  }

  ngOnDestroy() {
    //delete component
    console.log('ngOnDestroy');
    //Ejemplo de borrar procesos que podrian quedar funcionando aún cuando se haya eliminado el component;
   /*  window.clearInterval(this.counterFn); */
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Log Hijo');
    //Como en EventEmitter<string>() tipeamos una string
    //En el emit, enviamos una string
    this.loaded.emit(this.img);
  }
}
