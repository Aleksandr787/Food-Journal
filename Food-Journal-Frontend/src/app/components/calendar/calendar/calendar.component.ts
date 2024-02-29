import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IDay } from '../../../interfaces/day';
import { DayService } from '../../../services/day/day.service';


@Component({
  selector: 'cm-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
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

  <div class="example-events">
    <p>grgr + {{day?.id}}</p>

    <!-- @for (e of events; track e) {
      <div>{{e}}</div>
    } -->
  </div>
  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  public day: IDay | undefined;

  constructor(
    private _dayService: DayService,
  ) { 
    this._dayService.getDayNow().subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);
      this.day = res;
    });
  }

  getDayEvent(event: MatDatepickerInputEvent<Date>) {
    // add day from dayservice
    if (event.value === null) return;
    this._dayService.getDay(event.value).subscribe((res) => {
      console.log(res.id);
      console.log(res.userId);

      this.day = res;
    });
  }
}

