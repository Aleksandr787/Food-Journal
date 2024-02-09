import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IBookImage } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image/book-image.service';
import { AuthorPipe } from "../../pipes/author/author.pipe";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DeleteBooksComponent } from '../dialogs/delete-books/delete-books/delete-books.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'cm-book-card',
  standalone: true,
  template: `
    <div class="container-main">

      <div class="header-wrapper">
        <div class="header">
          <div class="header__search">
            <button mat-icon-button disabled="true">
                <mat-icon class="header__search__icon">search</mat-icon>
            </button>
            <input (keyup)="filterResults(filter.value)" type="text" placeholder="Filter by name" #filter>
            <button mat-icon-button>
                <mat-icon class="header__search__icon">mic</mat-icon>
            </button>
          </div>
          <button mat-fab color="warn" class="header__button" (click)="deleteAll()" aria-label="Example icon button with a delete icon">
              <mat-icon class="material-symbols-outlined">delete</mat-icon>
          </button>
        </div>
      </div>
      
      <div class="container-cards">
        @for (book of booksFilteredList; track book) {
          <div matRipple class="card" [routerLink]="['/books', book.id]">
            <img src={{book.imageUrl}} alt="" class="card__image">
            <div class="card__info">
              <span class="card__info__name">{{book.name}}</span>
              <span class="card__info__author">{{book | author}}</span>
            </div>
          </div>  
        }
      </div>
    
    </div>

  `,
  styleUrl: './book-card.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    AuthorPipe,
    RouterModule
  ]
})
export class BookCardComponent {

  public books: IBookImage[] = [];
  public booksFilteredList: IBookImage[] = [];
  public filterValue: string = '';

  constructor(
    private _bookImageService: BookImageService,
    private _dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.loadBook();
    
    this._bookImageService.eventAddBook.subscribe(() => {
      this.loadBook();
    })
  }

  public loadBook(): void {
    console.log("loadBook");
    this._bookImageService.getAll().subscribe(books => {
      this.books = books;
      this.filterResults(this.filterValue);
    });
  }

  filterResults(text: string) {
    this.filterValue = text;

    if (!text) {
      this.booksFilteredList = this.books;
      return;
    }

    this.booksFilteredList = this.books.filter(
      book => book?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  public deleteAll(): void {
    const dialogRef = this._dialog.open(DeleteBooksComponent, {data: {all: true}});
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this._bookImageService.deleteAll().subscribe(()=>{
          this.loadBook();
        });
      }
    });
  }
}
