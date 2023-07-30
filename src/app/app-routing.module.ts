import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsAnnonceComponent } from './details/details-annonce.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { DemandeComponent } from './demande/demande.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { DemandesComponent } from './demandes/demandes.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';


const routes: Routes = [
  {
    path: 'details-annonce/:id', component: DetailsAnnonceComponent
  },
  {
    path: 'annonces', component: AnnoncesComponent
  },
  {
    path: 'demande', component: DemandeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profil', component: ProfilComponent
  },
  {
    path: 'demandes', component: DemandesComponent
  },
  {
    path: 'main-page', component: MainpageComponent
  },
  {
    path: 'register-confirmation', component: RegisterConfirmationComponent
  },
  {
    path:'', redirectTo: '/main-page', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
