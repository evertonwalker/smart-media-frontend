import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutheticationComponent } from './pages/authetication/authetication.component';


const routes: Routes = [
    { path: '**', component: AutheticationComponent },
    { path: 'login', component: AutheticationComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }