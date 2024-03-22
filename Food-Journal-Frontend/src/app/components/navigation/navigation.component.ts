import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'cm-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <div class="navigation">

      <div class="navigation__category">
        <mat-nav-list>
          <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">person</mat-icon>
              <span>Профиль</span>
            </div>
          </a>
          <a mat-list-item routerLink="products" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">grocery</mat-icon>
              <span>Продукты</span>
            </div>
          </a>
          <a mat-list-item routerLink="calendar" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">calendar_month</mat-icon>
              <span>Календарь</span>
            </div>
          </a>
          <a mat-list-item (click)="logout();">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">logout</mat-icon>
              <span>Выйти</span>
            </div>
          </a>
        </mat-nav-list>
      </div>
    </div>
  `,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(
    private _authService: AuthService,
  ) {
  }

  public logout(): void {
    this._authService.logout();
  }
}
