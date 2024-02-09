import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from '../../../interfaces/login';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'cm-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule
  ],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Welcome Back</span>
        <div class="login">
        <span class="">Don't have an account?</span>
        <a class="login__button" (click)="toRegister()">Sign up</a>
        </div>
        <form [formGroup]="bookForm" class="register__form">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email">
            <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>    
            <mat-error *ngIf="email.hasError('email')">Email is invalid</mat-error>    
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <mat-error *ngIf="password.hasError('required')">Password is required</mat-error>
            <input type="password" matInput formControlName="password">    
          </mat-form-field>
        </form>

        <div class="register__buttons">
          <button mat-flat-button [disabled]="bookForm.invalid" (click)="login()">Sign In</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  bookForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public get email(): FormControl<string> {
    return this.bookForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.bookForm.get('password') as FormControl<string>;
  }

  public login(): void {
    let loginModel: ILogin = {
      email: this.email.value,
      password: this.password.value
    }
    this._authService.login(loginModel).subscribe({
      next: () => {
        this._router.navigate(['/main']);
      },
      error: () => {
        alert('Nope');
      }
    });
  }

  public toRegister(): void {
    this._router.navigate(['/register']);
  }
}
