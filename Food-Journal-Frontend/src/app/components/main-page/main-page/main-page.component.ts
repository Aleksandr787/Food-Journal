import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSliderModule } from '@angular/material/slider';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserParametrs } from '../../../interfaces/user';
import { GoalPipePipe } from "../../../pipes/goal-pipe.pipe";
import { ActivityPipe } from "../../../pipes/activity.pipe";
import { GenderPipe } from "../../../pipes/gender.pipe";

@Component({
    selector: 'cm-main-page',
    standalone: true,
    template: `
    <div *ngIf="authService.isAutorized" class="main-container">
      <div *ngIf="userParametrs" class="title">
        <h2>Привет, {{authService.userName}}!</h2>
        <h2>Возраст: {{userParametrs.age}}</h2>
        <h2>Рост(см): {{userParametrs.height}}</h2>
        <h2>Вес(кг): {{userParametrs.weight}}</h2>
        <h2>Пол: {{userParametrs.gender | gender}}</h2>
        <h2>Физическая активность: {{userParametrs.activity | activity}}</h2>
        <h2>Цель: {{userParametrs.goal | goalPipe}}</h2>
        <h2>Cуточная норма каллорий (ккал): {{authService.calculateCalorieIntake(userParametrs)}}</h2>

        <button mat-flat-button (click)="onUpdateUserParametrsDialog()">Обновить данные</button>
        <!-- <h1>This is a book library,</h1>
        <h1>Generate your books right now!</h1> -->
      
      </div>

      <!-- <div class="button-wrapper-icons">
          <button mat-flat-button (click)="onUpdateUserParametrsDialog()">Обновить данные</button>
      </div> -->
      
      <!-- <div class="slider-wrapper">
        <mat-slider class="slider" min="0" max="30" step="1" discrete [displayWith]="formatLabel" >
          <input matSliderThumb #slider>
        </mat-slider>
      </div> -->

      <!-- <div class="button-wrapper-icons">
        <mat-icon class="material-symbols-outlined">arrow_forward</mat-icon>
          <button mat-flat-button (click)="generateBooks(slider.value)">Generate</button>
        <mat-icon class="material-symbols-outlined">arrow_back</mat-icon>
      </div> -->
    </div>
  `,
    styleUrl: './main-page.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatSliderModule,
        GoalPipePipe,
        ActivityPipe,
        GenderPipe
    ]
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
    this.loadUserParametrs();

    this.authService.eventUpdateUserParametrs.subscribe(() => {
      this.loadUserParametrs();
    })
  }

  public loadUserParametrs(): void {
    this.authService.getUserParametrs().subscribe((res) => {
      this.userParametrs = res;
    });
  }

  public formatLabel(value: number): string {
    this.sliderValue = `${value}`;
    return `${value}`;
  }

  public onUpdateUserParametrsDialog(): void {
    if(!this.userParametrs) return;
    this.authService.dialogUpdateUserParametrs(this.userParametrs);
    // userId возьмётся на беке, юзерПараметры из диалога создам

  }

  public generateBooks(count: string): void {
    const bookCount: number = parseInt(count, 10);
    this._bookImageService.generate(bookCount).subscribe();
    this._router.navigate(['/books']);
  }
}
