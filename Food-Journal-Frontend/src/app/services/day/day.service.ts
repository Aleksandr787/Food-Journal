import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDay, IProductItem, IProductItemRequest } from '../../interfaces/day';
import { MatDialog } from '@angular/material/dialog';
import { WeightProductDialogComponent } from '../../components/weight-product-dialog/weight-product-dialog/weight-product-dialog.component';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(
    private _httpClient: HttpClient,
    private _dialog: MatDialog,
  ) { }

  public addProductItem(id: Date, productItem: IProductItemRequest): Observable<IProductItem> {
    console.log("Add productItem");
    return this._httpClient.post<any>(environment.apiUrlDocker + 'days/' + (new Date(id)).toDateString(), JSON.stringify(productItem));

    // return this.isNotValidImageUrl(productAdd.imageUrl).pipe(
    //   tap((result) => {
    //     if (result) {
    //       productAdd.imageUrl = this._defaultImageUrl;
    //     }
    //   }),
    //   switchMap(() => this._httpClient.post<any>(environment.apiUrlDocker + 'books', JSON.stringify(productAdd)))
    // );
  }

  public dialogAddWeight(dayId: Date, product: IProduct): void {
    // создь addProductComponent (диaлог)
    const dialogRef = this._dialog.open(WeightProductDialogComponent, {data: {product: product}});

    dialogRef.afterClosed().subscribe((result: IProductItemRequest) => {
      if (!result) return;
      this.addProductItem(dayId, result).subscribe(() => {
        // this.eventAddProduct.emit();
      });
    });
  }

  public getDay(id: Date): Observable<IDay> {
    console.log("Get Day");
    return this._httpClient.get<IDay>(environment.apiUrlDocker + 'days/' + (new Date(id)).toDateString());
  }

  public getDayNow(): Observable<IDay> {
    console.log("Get Day");
    return this._httpClient.get<IDay>(environment.apiUrlDocker + 'days/' + (new Date()).toDateString());
  }


}
