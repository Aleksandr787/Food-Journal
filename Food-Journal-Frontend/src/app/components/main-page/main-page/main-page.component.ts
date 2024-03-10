import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSliderModule } from '@angular/material/slider';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserParametrs } from '../../../interfaces/user';

@Component({
  selector: 'cm-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
  ],
  template: `
    <div *ngIf="authService.isAutorized" class="main-container">
      <div *ngIf="userParametrs" class="title">
        <h1>Привет, {{authService.userName}}!</h1>
        <h1>Возраст: {{userParametrs.age}}</h1>
        <h1>Рост(см): {{userParametrs.height}}</h1>
        <h1>Вес(кг): {{userParametrs.weight}}</h1>
        <h1>Пол: {{userParametrs.gender}}</h1>
        <h1>Физическая активность: {{userParametrs.activity}}</h1>
        <!-- <h1>This is a book library,</h1>
        <h1>Generate your books right now!</h1> -->
      
      </div>

      
      <div class="slider-wrapper">
        <mat-slider class="slider" min="0" max="30" step="1" discrete [displayWith]="formatLabel" >
          <input matSliderThumb #slider>
        </mat-slider>
      </div>

      <!-- <div class="button-wrapper-icons">
        <mat-icon class="material-symbols-outlined">arrow_forward</mat-icon>
          <button mat-flat-button (click)="generateBooks(slider.value)">Generate</button>
        <mat-icon class="material-symbols-outlined">arrow_back</mat-icon>
      </div> -->
    </div>
  `,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  public sliderValue: string = '';
  public userParametrs: IUserParametrs | undefined;

  constructor(
    public authService: AuthService,
    private _bookImageService: BookImageService,
    private _router: Router,
    ) {
  }

  ngOnInit(): void {
    this.authService.getUserParametrs().subscribe((res) => {
      this.userParametrs = res;
      console.log(res.age);
      console.log(res.height);

    });
  }


  public formatLabel(value: number): string {
    this.sliderValue = `${value}`;
    return `${value}`;
  }

  public generateBooks(count: string): void {
    const bookCount: number = parseInt(count, 10);
    this._bookImageService.generate(bookCount).subscribe();
    this._router.navigate(['/books']);
  }
}
