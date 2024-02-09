import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { AuthService } from './services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
@Component({
    selector: 'cm-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        NavigationComponent,
        MatButtonModule,
        MatSliderModule

    ]
})
export class AppComponent {

  constructor(
    public authService : AuthService
  ) {}

  title = 'lection-angular';
}