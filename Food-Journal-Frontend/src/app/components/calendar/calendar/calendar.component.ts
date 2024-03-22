import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IDay, IProductItem, IProductItemRequest } from '../../../interfaces/day';
import { DayService } from '../../../services/day/day.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SearchProductDialogComponent } from '../../search-product-dialog/search-product-dialog/search-product-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteBooksComponent } from '../../dialogs/delete-books/delete-product/delete-product.component';
import Chart from 'chart.js/auto';
import { IUserStandart } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'cm-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  template: `
  <div *ngIf="invalidUserParams()" class="container">
    <mat-form-field class="example-full-width">
      <mat-label>Choose a date</mat-label>
      <input matInput [matDatepicker]="picker"
      (dateInput)="getDayEvent($event)">
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matIconSuffix [for]="picker">
        <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <button mat-fab color="warn" class="header__button" (click)="addProductItem()">
      <mat-icon class="material-symbols-outlined">add</mat-icon>
    </button>
    
    <p>Выбранный день: {{day?.id}}</p>
    <div class="chart-container">
      <canvas id="MyChart" >{{ chart }}</canvas>
    </div>
    <div *ngIf="macrosResult">
      <p>Сумма белков: {{ macrosResult.totalProteins }}</p>
      <p>Сумма жиров: {{ macrosResult.totalFats }}</p>
      <p>Сумма углеводов: {{ macrosResult.totalCarbohydrates }}</p>
    </div>
    <div class="productsList">
      <div class="product" *ngFor="let productItem of getProductsItems()">
        <p class="product__name">{{ productItem.product.name.toString() }}</p>
        <div class="product__info">
          <div class="product__info__left">
            <p class="product__info__left__bju">Б: {{productItem.proteins}}</p>
            <p class="product__info__left__bju">Ж: {{ productItem.fats }}</p>
            <p class="product__info__left__bju">У: {{ productItem.carbohydrates }}</p>
          </div>
          <div class="product__info__right">
            <p class="product__info__right">{{productItem.kcal}} к.</p>
            <p class="product__info__right">{{productItem.weight}} г.</p>
          </div>
        </div>
        <button class="product__delete" mat-icon-button (click)="onDeleteProductItem(productItem.id)">
          <mat-icon class="navigation__category__item__icon material-symbols-outlined">delete</mat-icon>
        </button>
        <!-- <p >Weight: {{ productItem.weight }}</p>
        <p>Proteins: {{ productItem.proteins }}</p>
        <p>Fats: {{ productItem.fats }}</p>
        <p>Carbohydrates: {{ productItem.carbohydrates }}</p>
        <p>kcal: {{ productItem.kcal }}</p> -->

      </div>
    </div>

  </div>
  <div *ngIf="!invalidUserParams()" class="container">
    <h2 class="container__info">Для работы с календарём введите корректные параметры в разделе "профиль"</h2>
  </div>

  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  public day: IDay | null = null;
  public macrosResult: any;
  public chart: any;
  // public userStandart: IUserStandart = {
  //   kkal: 10,
  //   proteins: 10,
  //   fats: 10,
  //   carbohydrates: 10
  // };

  public eventSentDate: EventEmitter<Date> = new EventEmitter<Date>();
  // public eventUserStandart: EventEmitter<IUserStandart> = new EventEmitter<IUserStandart>();


  constructor(
    private _router: Router,
    private _dayService: DayService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _authService: AuthService,
  ) {
    this._authService.loadUserParametrs();
  }

  ngOnInit(): void {
    // this._authService.eventUserStandart.subscribe((res) => {
    //   this.userStandart = res;
    // });

    this.loadDayNow();
    // console.log(this.day);

    this._route.queryParams.subscribe(params => {
      let dayId = params['dayId'];
      if (dayId) {
        this.loadDay(params['dayId']);
      }
    });


    //this.createChart();

    // this._dayService.eventCurrentDay.subscribe((dayId : Date) => {
    //   console.log("ЗАШЛО В ЕВЕНТДЭЙ")
    //   this.loadDay(dayId);
    // })
  }

  public invalidUserParams(): boolean {
    if (!this._authService.userStandarts) return false;

    if (this._authService.userStandarts.proteins === -1 ||
      this._authService.userStandarts.fats === -1 ||
      this._authService.userStandarts.carbohydrates === -1) {
      return false;
    }

    return true;
  }

  public createChart(data: any): Chart | undefined {
    if (this.chart) {
      this.chart.destroy();
    }

    return this._authService.userStandarts ? new Chart("MyChart", {
      type: 'bar',
      data: {// values on X-Axis
        labels: ['Белки', 'Жиры', 'Углеводы'],
        datasets: [
          {
            label: "Съедено",
            data: [data.totalProteins, data.totalFats, data.totalCarbohydrates],
            backgroundColor: 'blue'
          },
          {
            label: "Норма",
            data: [this._authService.userStandarts.proteins, this._authService.userStandarts.fats, this._authService.userStandarts.carbohydrates],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2
      }

    }) : undefined;
  }

  calculateTotalMacros(day: IDay) {
    let totalProteins = 0;
    let totalFats = 0;
    let totalCarbohydrates = 0;

    day.productItems.forEach((product: any) => {
      totalProteins += product.proteins;
      totalFats += product.fats;
      totalCarbohydrates += product.carbohydrates;
    });
    totalProteins = Math.round(totalProteins);
    totalFats = Math.round(totalFats);
    totalCarbohydrates = Math.round(totalCarbohydrates);
    return { totalProteins, totalFats, totalCarbohydrates };
  }

  public getProductsItems(): IProductItem[] {

    if (this.day !== null) {
      //console.log("ЗАШЛО!!!!  ->  " + this.day.productItems);
      return this.day.productItems;
    } else {
      //console.log("ПУСТОЙ СПИСОК!!!!");
      return [];
    }
  }

  public loadDayNow() {
    this._dayService.getDayNow().subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
      this.macrosResult = this.calculateTotalMacros(this.day);
      this.chart = this.createChart(this.macrosResult);
    });
  }

  public loadDay(id: Date) {
    this._dayService.getDay(id).subscribe((res) => {
      console.log('load CURRENT day')
      this.day = res;
      this.macrosResult = this.calculateTotalMacros(this.day);
      this.chart = this.createChart(this.macrosResult);
    });
  }

  public getDayEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) return;
    this.loadDay(event.value);
  }

  public addProductItem(): void {
    if (this.day === null) return;
    this._router.navigate(['/calendar/search'], { queryParams: { dayId: this.day.id } });
  }


  public onDeleteProductItem(productItemId: string): void {
    const dialogRef = this._dialog.open(DeleteBooksComponent, { data: { all: true } });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (this.day === null) return;
        let dayId = this.day.id;
        this._dayService.deleteProductItem(dayId, productItemId).subscribe(() => {
          this.loadDay(dayId)
          //this._router.navigate(['/books']);
        });
      }
    });
  }
}

