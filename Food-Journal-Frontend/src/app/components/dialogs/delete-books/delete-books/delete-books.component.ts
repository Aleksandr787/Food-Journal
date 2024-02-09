import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cm-delete-books',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h1 *ngIf="data.all" mat-dialog-title class="headline">
      Delete all books?
    </h1>
    <h1 *ngIf="!data.all" mat-dialog-title class="headline">
      Delete book?
    </h1>

    <div mat-dialog-content></div>
    
    <div mat-dialog-actions class="actions">
      <button mat-flat-button (click)="onClose()" >No</button>
      <button mat-flat-button (click)="onDelete()" >Yes</button>
    </div>
  `,
  styleUrl: './delete-books.component.scss'
})
export class DeleteBooksComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBooksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {all: boolean},
  ) {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onDelete(): void {
    this.dialogRef.close(this.data);
  }
}
