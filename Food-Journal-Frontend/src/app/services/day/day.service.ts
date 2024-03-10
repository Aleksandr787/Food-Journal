import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDay, IProductItem, IProductItemRequest } from '../../interfaces/day';
import { MatDialog } from '@angular/material/dialog';
import { WeightProductDialogComponent } from '../../components/weight-product-dialog/weight-product-dialog/weight-product-dialog.component';
import { IProduct } from '../../interfaces/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  // КАК-ТО ПЕРЕДАВАТЬ ДАТУ В ЕВЕНТЕМИТТЕР
  public eventCurrentDay: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _httpClient: HttpClient,
    private _dialog: MatDialog,
    private _router: Router
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

  public deleteProductItem(dayId: Date, productId: string) {
    console.log("Delete productItem");
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'days/' + (new Date(dayId)).toDateString() + '/' + productId);  
  }

  // public addWeightDialog(product: IProduct): void {
  //   const dialogRef = this._dialog.open(WeightProductDialogComponent, { data: { product: product } });

  //   dialogRef.afterClosed().subscribe((result: IProductItemRequest) => {
  //     if (result) {
  //       this._dayService.addProductItem(this.dayId, result).subscribe(() => {
  //         // КАКИМТО ОБРАЗОМ ПРИ ОБРАТНОЙ НАВИГАЦИИ В КАЛЕНДАРЬ ПЕРЕДАВАТЬ DayID ЧТОБЫ ЗАГРУЗИТЬ ИМЕННО ЭТУ СТРАНИЦУ КАЛЕНДАРЯ!
  //         this._router.navigate(['/calendar'])
  //       });
  //       // this._dayService.addProductItem(this.dayId, result).subscribe(() => {
  //       //   this._router.navigate(['/calendar'])
  //       // });
  //     }
  //   });
  // }

  public dialogAddWeight(dayId: Date, product: IProduct): void {
    // создь addProductComponent (диaлог)
    const dialogRef = this._dialog.open(WeightProductDialogComponent, { data: { product: product } });

    dialogRef.afterClosed().subscribe((result: IProductItemRequest) => {
      if (result) {
       this.addProductItem(dayId, result).subscribe(() => {
        // ПОПРОБОВАТЬ СДЕЛАТЬ НАВИГЕЙТ С QUERY PARAMS И ПЕРЕДАТЬ DAYID
        this._router.navigate(['/calendar'], {queryParams: {dayId: dayId}});
        
        // this.eventCurrentDay.emit(dayId);
       }) 
      }
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
