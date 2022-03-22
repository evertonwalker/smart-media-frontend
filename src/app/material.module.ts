import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [MatSnackBarModule, MatSidenavModule, MatIconModule, MatToolbarModule];
@NgModule({
    exports: [modules],
    imports: [modules]
})
export class MaterialModule { }