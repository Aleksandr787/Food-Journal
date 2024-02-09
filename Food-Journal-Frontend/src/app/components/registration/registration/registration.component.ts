import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth.service';
import { IRegister } from '../../../interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="wrapper">
      <div class="register">
        <span class="register__title">Create Your Account</span>
        <div class="login">
        <span class="">Already have an account?</span>
        <a class="login__button" (click)="logout()">Login</a>
        </div>
        <form [formGroup]="bookForm" class="register__form">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name">
            <mat-error *ngIf="name.hasError('required')">Name is required</mat-error>    
          </mat-form-field>
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
          <button mat-flat-button [disabled]="bookForm.invalid" (click)="register()">Create account</button>
        </div>
      </div>
    </div>

  `,
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  bookForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public get name(): FormControl<string> {
    return this.bookForm.get('name') as FormControl<string>;
  }

  public get email(): FormControl<string> {
    return this.bookForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.bookForm.get('password') as FormControl<string>;
  }

  public register(): void {
    let registerModel: IRegister = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }
    this._authService.register(registerModel).subscribe(() => {
      this._router.navigate(['/login']);
    });
  }

  public logout(): void {
    this._authService.logout();
  }
}
