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
        <div *ngIf="userStandarts" class="title">
          <h2>Cуточная норма каллорий (ккал): {{userStandarts.kkal}}</h2>
          <h2>Cуточная норма белков (гр): {{userStandarts.proteins}}</h2>      
          <h2>Cуточная норма жиров (гр): {{userStandarts.fats}}</h2>      
          <h2>Cуточная норма углеводов (гр): {{userStandarts.carbohydrates}}</h2>      

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
        GenderPipe
    ]
})
export class MainPageComponent implements OnInit {

  public sliderValue: string = '';
  public userParametrs: IUserParametrs | undefined;
  public userStandarts: IUserStandart | undefined;

  constructor(
    public authService: AuthService,
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
      this.userStandarts = this.authService.calculateCalorieIntake(res);
      this.authService.eventUserStandart.emit(this.userStandarts);
    });
  }

  public formatLabel(value: number): string {
    this.sliderValue = `${value}`;
    return `${value}`;
  }

  public onUpdateUserParametrsDialog(): void {
    if(!this.userParametrs) return;
    this.authService.dialogUpdateUserParametrs(this.userParametrs);
    this.authService.eventUserStandart.emit(this.userStandarts);
  }
}
