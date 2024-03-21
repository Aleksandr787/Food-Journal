import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSliderModule } from '@angular/material/slider';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserParametrs, IUserStandart } from '../../../interfaces/user';
import { GoalPipePipe } from "../../../pipes/goal-pipe.pipe";
import { ActivityPipe } from "../../../pipes/activity.pipe";
import { GenderPipe } from "../../../pipes/gender.pipe";
import { UserParametrsPipe } from "../../../pipes/user-parametrs.pipe";

@Component({
  selector: 'cm-main-page',
  standalone: true,
  template: `
    <div *ngIf="authService.isAutorized" class="main-container">
      <div *ngIf="authService.userParametrs" class="title">
      <h2>Привет, {{authService.userName}}!</h2>
      <div 
        [innerHTML]="authService.userParametrs | userParametrs">
      <h2>Привет, {{authService.userName}}!</h2>

      </div>
      <!-- <h2>Привет, {{authService.userName}}!</h2>
        <h2>Возраст: {{authService.userParametrs.age}}</h2>
        <h2>Рост(см): {{authService.userParametrs.height}}</h2>
        <h2>Вес(кг): {{authService.userParametrs.weight}}</h2>
        <h2>Пол: {{authService.userParametrs.gender | gender}}</h2>
        <h2>Физическая активность: {{authService.userParametrs.activity | activity}}</h2>
        <h2>Цель: {{authService.userParametrs.goal | goalPipe}}</h2> -->
        <div *ngIf="authService.userStandarts && authService.userStandarts.kkal > 1" class="title">
          <h2>Cуточная норма каллорий (ккал): {{authService.userStandarts.kkal}}</h2>
          <h2>Cуточная норма белков (гр): {{authService.userStandarts.proteins}}</h2>      
          <h2>Cуточная норма жиров (гр): {{authService.userStandarts.fats}}</h2>      
          <h2>Cуточная норма углеводов (гр): {{authService.userStandarts.carbohydrates}}</h2>      
        </div>
        <div *ngIf="authService.userStandarts && authService.userStandarts.kkal === -1" class="title">
          <h2>Заполните корректно данные</h2>      
        </div>

        <button mat-flat-button (click)="onUpdateUserParametrsDialog()">Обновить данные</button>
      </div>
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
    GenderPipe,
    UserParametrsPipe
  ]
})
export class MainPageComponent implements OnInit {

  public sliderValue: string = '';

  constructor(
    public authService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.loadUserParametrs();
  }

  public formatLabel(value: number): string {
    this.sliderValue = `${value}`;
    return `${value}`;
  }

  public onUpdateUserParametrsDialog(): void {
    this.authService.dialogUpdateUserParametrs();
    // this.authService.eventUserStandart.emit(this.userStandarts);
  }
}
