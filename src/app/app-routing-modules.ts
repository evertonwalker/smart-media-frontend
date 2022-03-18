import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutheticationComponent } from './pages/authetication/authetication.component';
import { AuthGuardService } from './pages/authetication/services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
    { path: '', component: AutheticationComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: '**', component: AutheticationComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }