import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutheticationComponent } from './pages/authetication/authetication.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
    { path: 'login', component: AutheticationComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: AutheticationComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }