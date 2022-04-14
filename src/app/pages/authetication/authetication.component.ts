import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-authetication',
  templateUrl: './authetication.component.html',
  styleUrls: ['./authetication.component.css'],
  animations: [
    trigger('loginOrRegister', [
      state('signin', style({
        transform: 'translatex(0)',
      })),
      state('signup', style({
        transform: 'translatex(-375px)',
      })),
      transition('signin <=> signup', [
        animate('1s cubic-bezier(0.165, 0.84, 0.44, 1)')
      ])
    ])
  ]
})
export class AutheticationComponent implements OnDestroy {

  passwordInput = 'password';

  createAccount = false;

  destroyedLogin!: Subscription;
  destroyedRegister!: Subscription;
  formAuth = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  stateOfForm = true;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const obj = this.formAuth.value;
    this.destroyedLogin = this.authService.login(obj).subscribe(() => { });
  }

  onSubmitEmail(): void {

    const email = this.formAuth.get('email');

    this.authService.verifyEmail(email?.value).subscribe(() => {
      this.stateOfForm = false;
    })

  }

  onRegister(): void {
    const obj = this.formRegister.value;
    this.destroyedRegister = this.authService.createAccount(obj).subscribe(() => { });
  }

  get email(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroyedLogin?.unsubscribe();
  }

  changeTypePassword() {
    this.passwordInput === 'password' ? this.passwordInput = 'text' : this.passwordInput = 'password';
  }

}
