import { EventEmitter, Injectable } from '@angular/core';
import { IAddBookImage, IBookImage, IEditBookImage } from '../../interfaces/book';
import { Observable, switchMap, tap } from 'rxjs';
import { AddBookImageComponent } from '../../components/dialogs/add-book-image/add-book-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IAddProduct, IProduct } from '../../interfaces/product';
import { AddProductComponent } from '../../components/dialogs/add-product/add-product.component';
import { WeightProductDialogComponent } from '../../components/weight-product-dialog/weight-product-dialog/weight-product-dialog.component';
import { IProductItemRequest } from '../../interfaces/day';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public eventAddProduct: EventEmitter<any> = new EventEmitter<any>();
  
  private _defaultImageUrl: string = 'https://i.ebayimg.com/thumbs/images/g/BdQAAOSwvZNhtArq/s-l1600.jpg';
  //rivate _defaultImageUrl: string = 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706486400&semt=sph;';

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

  public getBook(id: string): Observable<IBookImage> {
    return this._httpClient.get<IBookImage>(environment.apiUrlDocker + 'books/' + id);
  }

  public addProduct(productAdd: IAddProduct): Observable<any> {
    console.log("Add product");

    return this._httpClient.post<any>(environment.apiUrlDocker + 'products', JSON.stringify(productAdd));

    // return this.isNotValidImageUrl(productAdd.imageUrl).pipe(
    //   tap((result) => {
    //     if (result) {
    //       productAdd.imageUrl = this._defaultImageUrl;
    //     }
    //   }),
    //   switchMap(() => this._httpClient.post<any>(environment.apiUrlDocker + 'books', JSON.stringify(productAdd)))
    // );
  }

  private isNotValidImageUrl(url: string): Observable<boolean> {
    const img = new Image();
    img.src = url;

    return new Observable<boolean>((observer) => {
      img.onload = function () {
        if (img.width < 100) {
          observer.next(true);
        } 
        else {
          observer.next(false);
        }

        observer.complete();
      };

      img.onerror = function () {
        observer.next(true);
        observer.complete();
      };
    })
  }

  public dialogAddProduct(): void {
    // создь addProductComponent (диaлог)
    const dialogRef = this._dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result: IAddProduct) => {
      if (!result) return;
      this.addProduct(result).subscribe(() => {
        this.eventAddProduct.emit();
      });
    });
  }




  public editBook(editBookModel: IEditBookImage): Observable<any> {
    console.log("Edit book");

    return this.isNotValidImageUrl(editBookModel.imageUrl).pipe(
      tap((result) => {
        if (result) {
          editBookModel.imageUrl = this._defaultImageUrl;
        }
      }),
      switchMap(() => this._httpClient.put<any>(environment.apiUrlDocker + 'books/' + editBookModel.id, JSON.stringify(editBookModel)))
    );
  }

  public deleteProduct(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'products/' + id);
  }

  public deleteAll(): Observable<any> {
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'books');
  }

  public generate(count: number): Observable<any> {
    return this._httpClient.post<any>(environment.apiUrlDocker + 'books/generate/' + count, null);
  }
}
