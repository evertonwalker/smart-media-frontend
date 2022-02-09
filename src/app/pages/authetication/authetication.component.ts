import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-authetication',
  templateUrl: './authetication.component.html',
  styleUrls: ['./authetication.component.css']
})
export class AutheticationComponent {

  formAuth = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const obj = this.formAuth.value;
    this.authService.login(obj)
      .subscribe(console.log);
  }

  get email(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formAuth.get('email') as FormControl;
  }


}
