import { UserService } from './../services/user.service';
import { JwtService } from './../services/jwt.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLogged : boolean = false;
  user : User;
  constructor(private router: Router,
              private jwtService: JwtService,
              private userService: UserService){}

  ngOnInit(): void {
    // location.reload();
    if(this.jwtService.getUserId()){
      this.isLogged = true;
    }
    this.getUser();
  }

  getUser(){
    this.userService.getUserById(this.jwtService.getUserId()).subscribe({
      next: (data)=>{
        this.user = data;
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
    this.isLogged = false;
  }
}
