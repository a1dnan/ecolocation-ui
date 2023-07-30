import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;

  constructor(private fb : FormBuilder,
              public authenticationService: AuthenticationService,
              private router: Router){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      cpassword: this.fb.control(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      age: this.fb.control(null, [Validators.required]),
      sexe: this.fb.control(null, [Validators.required]),
      phone: this.fb.control(null, [Validators.required])
    },
      {validator: this.passwordMatch("password", "cpassword")}
    );
  }

  register(){
    this.authenticationService.register(this.registerForm.value).subscribe({
      next: (data) =>{
        console.log(data);
        this.router.navigate(['register-confirmation']);
      }
    })
  }


  private passwordMatch(password: string, passwordConfirmation: string){
      return function(form: FormGroup){
        const passwordValue = form.controls[password].value;
        const confirmationPasswordValue = form.controls[passwordConfirmation].value;

        if(passwordValue == confirmationPasswordValue){
          return null;
        }
        return {passwordMismatchError: true};
      }
  }

}
