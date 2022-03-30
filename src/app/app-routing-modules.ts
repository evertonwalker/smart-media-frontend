import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';
import { AutheticationComponent } from './pages/authetication/authetication.component';
import { AuthGuardService } from './pages/authetication/services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { ListSchedulesComponent } from './pages/list-schedules/list-schedules.component';


const routes: Routes = [
    { path: 'login', component: AutheticationComponent },
    {
        path: '', component: MainMenuComponent, canActivate: [AuthGuardService], children: [
            { path: 'home', component: HomeComponent },
            { path: 'list-schedules', component: ListSchedulesComponent },
        ]
    },
    { path: '**', component: AutheticationComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }