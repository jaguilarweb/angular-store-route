import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService
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

  login() {
    this.authService.login('sebas@gmail.com', '1222')
    .subscribe(rta => {
      console.log(rta.access_token);
    })
  }
}
