import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IUserParametrs, IUserParametrsRequest } from '../../../../interfaces/user';
import { MatSliderModule } from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import { GoalPipePipe } from "../../../../pipes/goal-pipe.pipe";
import { ActivityPipe } from "../../../../pipes/activity.pipe";
import { GenderPipe } from "../../../../pipes/gender.pipe";


@Component({
    selector: 'cm-update-user-parametrs',
    standalone: true,
    template: `
    <h1 mat-dialog-title class="headline">
       Данные: 
    </h1>
    <div mat-dialog-content>
      <form [formGroup]="productForm" class="bookCardForm">
        <div class="sliderForm">
          <mat-label>Возвраст: {{age.value}}</mat-label>
          <mat-slider class="slider" min="12" max="99" step="1">
            <input matInput matSliderThumb formControlName="age" #age>
          </mat-slider>
        </div>
        <div class="sliderForm">
          <mat-label>Рост: {{height.value}}</mat-label>
          <mat-slider class="slider" min="100" max="200" step="1">
            <input matInput matSliderThumb formControlName="height" #height>
          </mat-slider>
        </div>
        <div class="sliderForm">
          <mat-label>Вес: {{weight.value}}</mat-label>
          <mat-slider class="slider" min="30" max="200" step="1">
            <input matInput matSliderThumb formControlName="weight" #weight>
          </mat-slider>
        </div>
        <div class="sliderForm">
          <mat-label>Пол: {{gender.value | gender}}</mat-label>
          <mat-slider class="slider" min="1" max="2" step="1">
            <input matInput matSliderThumb formControlName="gender" #gender>
          </mat-slider>
        </div>
        <div class="sliderForm">
          <mat-label>Физическая активность: {{activity.value | activity}}</mat-label>
          <mat-slider class="slider" min="1" max="4" step="1">
            <input matInput matSliderThumb formControlName="activity" #activity>
          </mat-slider>
        </div>
        <div class="sliderForm">
          <mat-label>Цель: {{goal.value | goalPipe}}</mat-label>
          <mat-slider class="slider" min="1" max="3" step="1">
            <input matInput matSliderThumb formControlName="goal" #goal>
          </mat-slider>
        </div>
      </form>
    </div>

    <div mat-dialog-actions class="actions">
        <button mat-flat-button (click)="onEdit()" [disabled]="productForm.invalid">Сохранить</button>
    </div>
  `,
    styleUrl: './update-user-parametrs.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRippleModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSliderModule,
        MatRadioModule,
        GoalPipePipe,
        ActivityPipe,
        GenderPipe
    ]
})
export class UpdateUserParametrsComponent {


  productForm = new FormGroup({
    age: new FormControl<number>(0, Validators.required),
    height: new FormControl<number>(0, Validators.required),
    weight: new FormControl<number>(0, Validators.required),
    gender: new FormControl<number>(0, Validators.required),
    activity: new FormControl<number>(0, Validators.required),
    goal: new FormControl<number>(0, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUserParametrsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IUserParametrs,
  ) { }
  
  ngOnInit(): void {
    if (!this.data) return;
    this.productForm.get('age')?.setValue(this.data.age);
    this.productForm.get('height')?.setValue(this.data.height);
    this.productForm.get('weight')?.setValue(this.data.weight);
    this.productForm.get('gender')?.setValue(this.data.gender);
    this.productForm.get('activity')?.setValue(this.data.activity);
    this.productForm.get('goal')?.setValue(this.data.goal);
  }

  public onEdit(): void {
    if (!this.data) return;

    let userParametrs: IUserParametrsRequest = {
      age: this.productForm.get("age")?.value ?? 0,
      height: this.productForm.get("height")?.value ?? 0,
      weight: this.productForm.get("weight")?.value ?? 0,
      gender: this.productForm.get("gender")?.value ?? 0,
      activity: this.productForm.get("activity")?.value ?? 0,
      goal: this.productForm.get("goal")?.value ?? 0
    }

    this.dialogRef.close(userParametrs);
  }


}
