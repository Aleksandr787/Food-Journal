import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDay, IProductItem, IProductItemRequest } from '../../interfaces/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(
    private _httpClient: HttpClient,
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

  public getDay(id: Date): Observable<IDay> {
    console.log("Get Day");
    return this._httpClient.get<IDay>(environment.apiUrlDocker + 'days/' + (new Date(id)).toDateString());
  }

  public getDayNow(): Observable<IDay> {
    console.log("Get Day");
    return this._httpClient.get<IDay>(environment.apiUrlDocker + 'days/' + (new Date()).toDateString());
  }


}
