import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { DetailsAnnonceComponent } from './details/details-annonce.component';
import { DemandeComponent } from './demande/demande.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ProfilComponent } from './profil/profil.component';
import { FavorisComponent } from './favoris/favoris.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DemandesComponent } from './demandes/demandes.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component'
import { HttpIntercepterService } from './services/http-intercepter.service';



@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    DetailsAnnonceComponent,
    DemandeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfilComponent,
    FavorisComponent,
    DemandesComponent,
    MainpageComponent,
    RegisterConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
