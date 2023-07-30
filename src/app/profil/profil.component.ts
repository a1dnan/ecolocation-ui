import { JwtService } from './../services/jwt.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText : 'Modifier' | 'Enregistrer' = 'Modifier';

  constructor(private userService: UserService,
              private jwtService: JwtService){}

  ngOnInit(): void {
    this.getUser(this.jwtService.getUserId());
    
  }

  getUser(userId : number){
    this.userService.getUserById(userId).subscribe({
      next: (data: User)=>{
          this.user = data;
          console.log(this.user);
      }
    })
  }

  updateUser(user: User){
    this.userService.updateUser(user, this.jwtService.getUserId()).subscribe({
      next: (data) =>{
        this.user = data;
        console.log(data);
      }
    })
  }

  changeMode(mode: 'edit' | 'locked'): void {
    this.mode = this.mode === 'locked' ? 'edit': 'locked';
    this.buttonText = this.buttonText === 'Modifier'? 'Enregistrer': 'Modifier';
    if(mode === 'edit'){
      //Logicto Up on the backend
      this.updateUser(this.user);
      
    }
  }

}
