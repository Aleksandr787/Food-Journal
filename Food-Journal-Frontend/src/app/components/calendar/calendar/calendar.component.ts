import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IDay, IProductItem } from '../../../interfaces/day';
import { DayService } from '../../../services/day/day.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'cm-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,

    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  template: `
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
  <p>grgr + {{day?.id}}</p>

  <div *ngFor="let productItem of getProductsItems()">
  
    <p>Product: {{ productItem.product.name.toString() }}</p>
    <p>Weight: {{ productItem.weight }}</p>
    <p>Proteins: {{ productItem.proteins }}</p>
    <p>Fats: {{ productItem.fats }}</p>
    <p>Carbohydrates: {{ productItem.carbohydrates }}</p>
    <p>kcal: {{ productItem.kcal }}</p>
  </div>
  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  public day: IDay | null = null;

  constructor(
    private _dayService: DayService,
  ) { 
    this.loadDayNow();
  }
  
  public getProductsItems(): IProductItem[] {
    
    if (this.day !== null) {
      console.log("ЗАШЛО!!!!  ->  " + this.day.productItems);
      return this.day.productItems;
    } else {
      console.log("ПУСТОЙ СПИСОК!!!!");
      return [];
    }
  }

  public loadDayNow() {
    this._dayService.getDayNow().subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
    });
  }

  public loadDay(id: Date) {
    this._dayService.getDay(id).subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
      console.log("ЭТоТ ДЕНЬ");
      console.log(this.day); // выводит day и в нём зполненый productsItems array 
      setTimeout(() => {
        console.log(this.day?.productItems);
    }, 2000);
      console.log(this.day.productItems); // выводит undefinde

    });
  }

  public getDayEvent(event: MatDatepickerInputEvent<Date>) {
    // add day from dayservice
    if (event.value === null) return;
    this._dayService.getDay(event.value).subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
    });
  }

  public addProductItem(): void {
    if(this.day === null) return;
    this._dayService.addProductItem(this.day.id, {
      weight: 50,
      productRequest: {
        name: "testProduct",
        proteins: 5,
        fats: 7,
        carbohydrates: 9,
      }
    }).subscribe((res) => {
      if(this.day) this.loadDay(this.day.id) 
    });

    this.loadDayNow();
  }
}

