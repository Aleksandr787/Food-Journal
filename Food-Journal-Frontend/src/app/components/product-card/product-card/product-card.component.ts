import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthorPipe } from '../../../pipes/author/author.pipe';
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../interfaces/product';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DeleteBooksComponent } from '../../dialogs/delete-books/delete-books/delete-books.component';

@Component({
  selector: 'cm-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    AuthorPipe,
    RouterModule,
    MatButtonToggleModule
  ],
  template: `
    <div class="container-main">

      <div class="header">

        <div class="header__buttons">
          <mat-button-toggle-group #group123="matButtonToggleGroup">
            <mat-button-toggle (click)="onBaseProductsClick()" [ngClass]="{'active': isActiveBase}"> База продуктов </mat-button-toggle>
            <mat-button-toggle (click)="onUserProductsClick()" [ngClass]="{'active': isActiveUser}"> Мои продукты </mat-button-toggle>
            <mat-button-toggle (click)="addProductDialog()"> Добавить продукт </mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <div class="header__search">
          
          <button mat-icon-button disabled="true">
              <mat-icon class="header__search__icon">search</mat-icon>
          </button>
          <input (keyup)="filterResults(filter.value)" type="text" placeholder="Filter by name" #filter>
          <button mat-icon-button>
              <mat-icon class="header__search__icon">mic</mat-icon>
          </button>
        </div>
        <!-- <button mat-fab color="warn" class="header__button" (click)="deleteAll()" aria-label="Example icon button with a delete icon">
            <mat-icon class="material-symbols-outlined">delete</mat-icon>
        </button> -->
      </div>
      
      <div class="container-cards">
        @for (product of productsFilteredList; track product) {
          <div class="card">
            <!-- учесть роутерлинк -->
            <div class="card__info">
              <span class="card__info__name">{{product.name}}</span>
              <span class="card__info__author">Белки: {{product.proteins}}</span>
              <span class="card__info__author">Жиры: {{product.fats}}</span>
              <span class="card__info__author">Углеводы: {{product.carbohydrates}}</span>
              <span class="card__info__author">Ккалории: {{product.kcal}}</span>
              <!-- <span class="card__info__author">{{book | author}}</span> -->
              <button *ngIf="keyUser()" mat-icon-button (click)="deleteProduct(product.id)">
                <mat-icon class="header__search__icon">delete</mat-icon>
              </button>
            </div>
          </div>  
        }
      </div>
    
    </div>
  `,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent  {
  
  public products: IProduct[] = [];
  public productsFilteredList: IProduct[] = [];
  public filterValue: string = '';
  private key: string = '0';
  public isActiveBase: boolean = true;
  public isActiveUser: boolean = false;

  constructor(
    private _productService: ProductService,
    private _dialog: MatDialog
  ) { }
  
  keyUser(): boolean {
    if(this.key === '1') return true;
    return false;
  }

  public onBaseProductsClick(): void {
    this.key = "0";
    this.isActiveBase = true;
    this.isActiveUser = false;
    this.loadProducts(this.key);
  }

  public onUserProductsClick(): void {
    this.key = "1";
    this.isActiveBase = false;
    this.isActiveUser = true;
    this.loadProducts(this.key);
  }

  public ngOnInit(): void {
    this.loadProducts(this.key);
    
    this._productService.eventAddProduct.subscribe(() => {
      this.loadProducts(this.key);
    })
  }

  public loadProducts(key: string): void {
    console.log("loadProducts key: " + key);
    if (key === "0"){
      this._productService.getAllBase().subscribe(products => {
        this.products = products;
        this.filterResults(this.filterValue);
      });
    }

    if (key === "1"){
      this._productService.getAllUser().subscribe(products => {
        this.products = products;
        this.filterResults(this.filterValue);
      });
    }
  }

  filterResults(text: string) {
    this.filterValue = text;

    if (!text) {
      this.productsFilteredList = this.products;
      return;
    }

    this.productsFilteredList = this.products.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  public addProductDialog(): void {
    this._productService.dialogAddProduct();
  }
  
  public deleteProduct(id: string): void {
    console.log("delete product");
    const dialogRef = this._dialog.open(DeleteBooksComponent, {data: {all: true}});
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this._productService.deleteProduct(id).subscribe(()=>{
          this.loadProducts('1');
        });
      }
    });
  }
}
