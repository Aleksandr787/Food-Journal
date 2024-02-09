import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IAddBookImage, IBookImage, IEditBookImage } from '../../../interfaces/book';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cm-add-book-image',
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
  templateUrl: './add-book-image.component.html',
  styleUrl: './add-book-image.component.scss'
})
export class AddBookImageComponent implements OnInit {

  bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    authorName: new FormControl<string>('', Validators.required),
    imageUrl: new FormControl<string>('')
  });

  constructor(
    public dialogRef: MatDialogRef<AddBookImageComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IBookImage,
  ) {
  }
  
  isData(): boolean {
    if(this.data) return true;
    return false;
  }

  ngOnInit(): void {
    if (!this.data) return;
    this.bookForm.get('name')?.setValue(this.data.name);
    this.bookForm.get('authorName')?.setValue(this.data.author);
    this.bookForm.get('imageUrl')?.setValue(this.data.imageUrl);
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
      this.onEdit();
    }
    else {
      this.onAdd();
    }
  }

  private onEdit(): void {
    if (!this.data) return;

    let book: IEditBookImage = {
      id: this.data?.id,
      name: this.bookForm.get("name")?.value ?? '',
      author: this.bookForm.get("authorName")?.value ?? '',
      imageUrl: this.bookForm.get("imageUrl")?.value ?? ''
    }

    this.dialogRef.close(book);
  }

  private onAdd(): void {
    let book: IAddBookImage = {
      name: this.bookForm.get("name")?.value ?? '',
      author: this.bookForm.get("authorName")?.value ?? '',
      imageUrl: this.bookForm.get("imageUrl")?.value ?? ''
    }

    this.dialogRef.close(book);
  }
}
