import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public isLoading = false;

  public readonly loginForm = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    isPersistent: false,
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  public handleLoginFormSubmit(): void {
    if (!this.loginForm.valid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    const [name, password, isPersistent] = [
      this.loginForm.controls.name.value!,
      this.loginForm.controls.password.value!,
      this.loginForm.controls.isPersistent.value ?? false,
    ];

    this.authService
      .login({ name, password, isPersistent })
      .subscribe()
      .add(() => {
        this.loginForm.reset();
        this.isLoading = false;
      });
  }
}
