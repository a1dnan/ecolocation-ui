import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../models/authenticationRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // authRequest : AuthenticationRequest = {
  //   email: '',
  //   password: ''
  // };

  userForm : FormGroup

  constructor(public authenticationService: AuthenticationService,
              private fb : FormBuilder,
              private route: Router){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login(){
    this.authenticationService.authenticate(this.userForm.value).subscribe({
      next: (data) =>{
        localStorage.setItem('token', data.token as string);
        // this.route.navigate(['annonces'])
        this.route.navigate(['annonces'])
          .then(() => {
            window.location.reload();
          });
        
        
      }
    })
  }


}
