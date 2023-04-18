import { Component, OnInit } from '@angular/core';
import { Login, Signin } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logVisible=false;
  signVisible=false;
  loading: boolean = true;

  loginFormData:Login={
    userName:'',
    password:''
  }
  signinFormData:Signin={
    name:'',
    email:'',
    userName:'',
    password:''
  }

  constructor(
    private _loginService : LoginService,
    private router: Router
  ){}

  ngOnInit() : void{
    this.loading=false;
  }

  logIn() {
    this.logVisible = !this.logVisible;
  }

  signIn() {
    this.signVisible = !this.signVisible;
  }

  onSubmitLogin() {
    this.logVisible = !this.logVisible;
    this.loading=true;
    this._loginService.login(this.loginFormData).subscribe(
      (user: Signin) => {
        console.log(user);
        this.router.navigate(['/books'])
        this.loading=false;
      },
    (error) => {
      alert('Invalid username or password');
      error.alert;
    });
  }

  onSubmitSignin() {
    this.signVisible = !this.signVisible;
    this.loading=true;
    this._loginService.signIn(this.signinFormData).subscribe(response => {
      this.loading=false;
      alert('Successful Application! Please log in now.');
      console.log(response);
    });
  }



}
