import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorPipe } from '../../../pipes/author/author.pipe';
import { IProduct } from '../../../interfaces/product';
import { ProductService } from '../../../services/product/product.service';
import { DayService } from '../../../services/day/day.service';

@Component({
  selector: 'cm-search-product-dialog',
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
  templateUrl: './search-product-dialog.component.html',
  styleUrl: './search-product-dialog.component.scss'
})
export class SearchProductDialogComponent {
  public products: IProduct[] = [];
  public productsFilteredList: IProduct[] = [];
  public filterValue: string = '';
  private key: string = '0';
  public isActiveBase: boolean = true;
  public isActiveUser: boolean = false;
  dayId: Date = new Date();

  constructor(
    private _productService: ProductService,
    private _dayService: DayService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  keyUser(): boolean {
    if (this.key === '1') return true;
    return false;
  }

  public ngOnInit(): void {
    this.loadProducts();

    this._route.queryParams.subscribe(params => {
      this.dayId = params['dayId'];
    });
  }


  public loadProducts(): void {
    this._productService.getAllBase().subscribe(products => {
      this.products = products;
      this.filterResults(this.filterValue);
    });

    this._productService.getAllUser().subscribe(products => {
      this.products.push(...products);
      this.filterResults(this.filterValue);
    });
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

  public onBack(): void {
    this._router.navigate(['/calendar'], {queryParams: {dayId: this.dayId}});
  }

  public addWeightDialog(product: IProduct): void {
    this._dayService.dialogAddWeight(this.dayId, product);
  }
}
