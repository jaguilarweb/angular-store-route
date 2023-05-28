import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string= 'valor inicial';
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './assets/images/default.png';

  constructor() { }

  ngOnInit(): void {
  }

  imgError(){
    this.img = this.imgDefault;
  }

  imgLoaded(){
    console.log('Log Hijo');
    //Como en EventEmitter<string>() tipeamos una string
    //En el emit, enviamos una string
    this.loaded.emit(this.img);
  }
}
