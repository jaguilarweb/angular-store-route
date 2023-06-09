import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  //TODO: Como hay 2 peticiones pasarlas a un switchMap
  login() {
    this.authService.login('sebas@gmail.com', '1222')
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe((user) => {
      this.profile = user;
    })
  }
}
