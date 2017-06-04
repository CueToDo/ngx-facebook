import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse, LoginStatus } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn: boolean = false;
  name: string = '';
  email: string = '';
  imgUrl: string = '';
  accessToken: string = '';
  showMore: boolean = false;

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '1114396292039346',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }


  ngOnInit() {
    this.getLoginStatus();
  }

  loginOptions: LoginOptions = {

  };



  // Facebook API call for getting user data
  getFacebookData() {
    this.fb.api('/me?fields=id,name,email,picture').then(
      (response: any) => {
        this.name = response.name;
        this.email = response.email;
        this.imgUrl = response.picture.data.url;
      },
      (error: any) => console.error(error)
    );
  }

  login() {
    this.fb.login(this.loginOptions).then(
      (response: LoginResponse) => {
        this.loggedIn = true;
        this.accessToken = response.authResponse.accessToken;
        this.getFacebookData();
      },
      (error: any) => console.error(error)
    );
  }

  getLoginStatus() {
    this.fb.getLoginStatus().then(
      (response: LoginStatus) => {
        if (response.status === 'connected') {
          this.loggedIn = true;
          this.accessToken = response.authResponse.accessToken;
          this.getFacebookData();
        }
      },
      (error: any) => console.error(error)
    )
  }

  logout() {
    this.fb.logout().then(
      (response: LoginResponse) => {
        this.loggedIn = false;
        this.accessToken = '';
      },
      (error: any) => console.error(error)
    );
  }
}
