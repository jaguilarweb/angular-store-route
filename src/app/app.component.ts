import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta= '';

  constructor(
    private userService: UsersService,
    private filesService: FilesService
  ){

  }

  onLoaded(img: string) {
    console.log('Log Padre ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'Seba',
      email: 'sebas@gmail.com',
      password: '1222'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  downloadPdf(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
/*     this.filesService.getFile('my.pdf', './../assets/files/texto.txt', 'application/txt') */
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.filesService.uploadFile(file)
      .subscribe( rta => {
        this.imgRta = rta.location
      });
    }
  }

}
