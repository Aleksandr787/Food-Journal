import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DayService } from '../../../services/day/day.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProductItemRequest } from '../../../interfaces/day';
import { IProduct } from '../../../interfaces/product';

@Component({
  selector: 'cm-weight-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    <h1 mat-dialog-title class="headline">
      Add Product
    </h1>
    <div mat-dialog-content>
      <form [formGroup]="productForm" class="bookCardForm">
        <mat-form-field appearance="outline">
          <mat-label>Proteins</mat-label>
          <input matInput formControlName="proteins">
        </mat-form-field>
      </form>
    </div>

    <div mat-dialog-actions class="actions">
      <button mat-flat-button (click)="onOk()" [disabled]="productForm.invalid">Save</button>
    </div>
  `,
  styleUrl: './weight-product-dialog.component.scss'
})
export class WeightProductDialogComponent {

  
  productForm = new FormGroup({
    proteins: new FormControl<number>(0, Validators.required),
  });

  constructor(
    private _router: Router,
    private _dayService: DayService,
    public dialogRef: MatDialogRef<WeightProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {product: IProduct},
  ) {

  }

  public onOk(): void {
    let productItemRequest: IProductItemRequest = {
      weight: this.productForm.get("proteins")?.value ?? 0,
      productRequest: {
        name: this.data.product.name,
        proteins: this.data.product.proteins,
        fats: this.data.product.fats,
        carbohydrates: this.data.product.carbohydrates
      }

    }

    this.dialogRef.close({data: {productItemRequest}});
  }
}
