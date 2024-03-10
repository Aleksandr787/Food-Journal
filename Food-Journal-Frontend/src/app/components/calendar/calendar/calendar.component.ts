import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IDay, IProductItem, IProductItemRequest } from '../../../interfaces/day';
import { DayService } from '../../../services/day/day.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SearchProductDialogComponent } from '../../search-product-dialog/search-product-dialog/search-product-dialog.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteBooksComponent } from '../../dialogs/delete-books/delete-books/delete-books.component';

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
  <div class="container">
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

  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{

  public day: IDay | null = null;
  public macrosResult: any;  

  public eventSentDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(
    private _router: Router,
    private _dayService: DayService,
    private _dialog: MatDialog,
    private _overlay: Overlay,
    private _route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.loadDayNow();
    // console.log(this.day);
    
    this._route.queryParams.subscribe(params => {
      let dayId = params['dayId'];
      if(dayId){
        this.loadDay(params['dayId']);
      }
    });

    // this._dayService.eventCurrentDay.subscribe((dayId : Date) => {
    //   console.log("ЗАШЛО В ЕВЕНТДЭЙ")
    //   this.loadDay(dayId);
    // })
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
    });
  }

  public loadDay(id: Date) {
    this._dayService.getDay(id).subscribe((res) => {
      console.log('load CURRENT day')
      this.day = res;
      this.macrosResult = this.calculateTotalMacros(this.day);
    });
  }

  public getDayEvent(event: MatDatepickerInputEvent<Date>) {
    // add day from dayservice
    if (event.value === null) return;
    this._dayService.getDay(event.value).subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
      this.macrosResult = this.calculateTotalMacros(this.day);
    });
  }

  public addProductItem(): void {
    if(this.day === null) return;
    // добАвить евент емитер который будет передАвАть дАту в search component
    // зАтем в нём будет выбирАться продукт -> всплывАть WeightProductdialog где будет выбирАться сколько грАмм съеденно
    // потом по dateId, productItem создАётся productItemRequest, добАвляется в day и зАтем идёт navigate в /calendar и нужно ПередАть dateiD
    // и вызвАть loadDay по конкретному DayId, что бы получАется я добАвил продукт и вернулся в этот нужжный мне конкретный день
    this._router.navigate(['/calendar/search'], {queryParams: {dayId: this.day.id}});
    //this.eventSentDate.emit(this.day.id);
    
    // let dayId = this.day.id;
    // const scrollStrategy = this._overlay.scrollStrategies.reposition();
    // const dialogRef = this._dialog.open(SearchProductDialogComponent, {
    //   autoFocus: false,
    //   scrollStrategy: scrollStrategy});

    // dialogRef.afterClosed().subscribe((result: IProductItemRequest) => {
    //   if (!result) return; 
    //   this._dayService.addProductItem(dayId, result).subscribe(() => {
    //     this.loadDay(dayId);
    //   });
    // });


    // this._dayService.addProductItem(this.day.id, {
    //   weight: 50,
    //   productRequest: {
    //     name: "testProduct",
    //     proteins: 5,
    //     fats: 7,
    //     carbohydrates: 9,
    //   }
    // }).subscribe((res) => {
    //   if(this.day) this.loadDay(this.day.id) 
    // });

    // this.loadDayNow();
  }

  
  public onDeleteProductItem(productItemId: string): void {
    const dialogRef = this._dialog.open(DeleteBooksComponent, {data: {all: true}});

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if(this.day === null) return;
        let dayId = this.day.id;
        this._dayService.deleteProductItem(dayId, productItemId).subscribe(() => {
          this.loadDay(dayId)
          //this._router.navigate(['/books']);
        });
      }
    });
  }
  // public addProductItem(): void {
  //   if(this.day === null) return;
  //   this._dayService.addProductItem(this.day.id, {
  //     weight: 50,
  //     productRequest: {
  //       name: "testProduct",
  //       proteins: 5,
  //       fats: 7,
  //       carbohydrates: 9,
  //     }
  //   }).subscribe((res) => {
  //     if(this.day) this.loadDay(this.day.id) 
  //   });

  //   this.loadDayNow();
  // }
}

