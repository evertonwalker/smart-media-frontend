import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-authetication',
  templateUrl: './authetication.component.html',
  styleUrls: ['./authetication.component.css']
})
export class AutheticationComponent implements OnDestroy {

  passwordInput = 'password';

  destroydLogin!: Subscription;
  formAuth = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const obj = this.formAuth.value;
    this.destroydLogin = this.authService.login(obj).subscribe(() => { });
  }

  get email(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroydLogin?.unsubscribe();
  }

  changeTypePassword() {
    this.passwordInput === 'password' ? this.passwordInput = 'text' : this.passwordInput = 'password';
  }

}
