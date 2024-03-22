import { EventEmitter, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IAddProduct, IProduct } from '../../interfaces/product';
import { AddProductComponent } from '../../components/dialogs/add-product/add-product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public eventAddProduct: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
  ) {
  }

  public getAllBase(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(environment.apiUrlDocker + 'products/base');
  }

  public getAllUser(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(environment.apiUrlDocker + 'products/user');
  }

  public addProduct(productAdd: IAddProduct): Observable<any> {
    console.log("Add product");

    return this._httpClient.post<any>(environment.apiUrlDocker + 'products', JSON.stringify(productAdd));
  }

  public dialogAddProduct(): void {
    const dialogRef = this._dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result: IAddProduct) => {
      if (!result) return;
      this.addProduct(result).subscribe(() => {
        this.eventAddProduct.emit();
      });
    });
  }

  public deleteProduct(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'products/' + id);
  }

  public generate(count: number): Observable<any> {
    return this._httpClient.post<any>(environment.apiUrlDocker + 'books/generate/' + count, null);
  }
}
