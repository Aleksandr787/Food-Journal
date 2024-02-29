import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IEditBookImage } from '../../../interfaces/book';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IAddProduct, IProduct } from '../../../interfaces/product';

@Component({
  selector: 'cm-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template:  `
    <h1 *ngIf="!isData()" mat-dialog-title class="headline">
        Add Product
    </h1>
    <h1 *ngIf="isData()" mat-dialog-title class="headline">
        Edit Product
    </h1>
    <div mat-dialog-content>
        <form [formGroup]="productForm" class="bookCardForm">
            <mat-form-field appearance="outline">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Proteins</mat-label>
                <input matInput formControlName="proteins">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Fats</mat-label>
                <input matInput formControlName="fats">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Carbohydrates</mat-label>
                <input matInput formControlName="carbohydrates">
            </mat-form-field>
        </form>
    </div>

    <div mat-dialog-actions class="actions">
        <button mat-flat-button (click)="onOk()" [disabled]="productForm.invalid">Save</button>
    </div>
  `,
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    proteins: new FormControl<number>(0, Validators.required),
    fats: new FormControl<number>(0, Validators.required),
    carbohydrates: new FormControl<number>(0, Validators.required),

  });

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IProduct,
  ) {
  }
  
  isData(): boolean {
    if(this.data) return true;
    return false;
  }

  ngOnInit(): void {
    if (!this.data) return;
    this.productForm.get('name')?.setValue(this.data.name);
    this.productForm.get('proteins')?.setValue(this.data.proteins);
    this.productForm.get('fats')?.setValue(this.data.fats);
    this.productForm.get('carbohydrates')?.setValue(this.data.carbohydrates);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onDelete(): void {
    if (!this.data) return;
    this.dialogRef.close(this.data.id);
  }

  public onOk(): void {
    if (this.data) {
      this.onAdd();
      //this.onEdit();
    }
    else {
      this.onAdd();
    }
  }

  private onEdit(): void {
    if (!this.data) return;

    let book: IEditBookImage = {
      id: this.data?.id,
      name: this.productForm.get("name")?.value ?? '',
      author: this.productForm.get("authorName")?.value ?? '',
      imageUrl: this.productForm.get("imageUrl")?.value ?? ''
    }

    this.dialogRef.close(book);
  }

  private onAdd(): void {
    let book: IAddProduct = {
      name: this.productForm.get("name")?.value ?? '',
      proteins: this.productForm.get("proteins")?.value ?? 0,
      fats: this.productForm.get("fats")?.value ?? 0,
      carbohydrates: this.productForm.get("carbohydrates")?.value ?? 0,

    }

    this.dialogRef.close(book);
  }
}
