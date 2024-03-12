import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login';
import { IRegister } from '../../interfaces/register';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserParametrs, IUserParametrsRequest } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserParametrsComponent } from '../../components/dialogs/update-user-parametrs/update-user-parametrs/update-user-parametrs.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public eventUpdateUserParametrs: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _router : Router,
    private _httpClient: HttpClient,
    private _dialog: MatDialog,
  ) { }

  public get isAutorized() : boolean {
    return window.localStorage.getItem('accesToken') != '';
  }

  public get isNotAutorized() : boolean {
    return window.localStorage.getItem('accesToken') === '';
  }

  public get accessToken() : string{
    let test = window.localStorage.getItem('accesToken'); 
    if(test == null) return '';
    return test;
  }

  public get userName() : string {
    // РЕАЛИЗОВАТЬ ЧТОБ ВОЗВРАЩАЛ ОБЪЕКТ ЮЗЕР ИЗ БЕКА

    // РЕАЛИЗОВАТЬ МЕТОД getUser, editUser(gender, height, weight, age, )
    let test = window.localStorage.getItem('userName'); 
    if(test == null) return '';
    return test;
  }

  public get userId() : string {
    let test = window.localStorage.getItem('userId'); 
    if(test == null) return '';
    return test;
  }

  public getUserParametrs() : Observable<IUserParametrs> {
    return this._httpClient.get<IUserParametrs>(environment.apiUrlDocker + 'auth/userParametrs');
  }

  public updateUserParametrs(userParametrs: IUserParametrsRequest): Observable<any> {

    return this._httpClient.put<any>(environment.apiUrlDocker + 'auth/userParametrs', JSON.stringify(userParametrs));

  }


  
  public login(loginModel : ILogin) : Observable<any> {
    return this._httpClient.post<any>(environment.apiUrlDocker + 'auth/login', JSON.stringify(loginModel))
    .pipe(
      tap({
        next: result => {
          window.localStorage.setItem('accesToken', result.accessToken);
          this.parseUser();
        },
        error: _ => {
          window.localStorage.setItem('accesToken', '');
          window.localStorage.setItem('userName', '');
          window.localStorage.setItem('userId', '');
        }
      })
    );
  }

  public register(registerModel : IRegister) : Observable<any> {
    return this._httpClient.post(environment.apiUrlDocker + 'auth/register', JSON.stringify(registerModel));
  }

  public logout() : void {
    window.localStorage.setItem('accesToken', '');
    window.localStorage.setItem('userName', '');
    window.localStorage.setItem('userId', '');
    
    this._router.navigate(['/login']);
  }

  private parseUser(): void {
    let authDataString = atob(this.accessToken.split('.')[1]);
    let userName = JSON.parse(authDataString).name;
    let userId = JSON.parse(authDataString).id; 
    window.localStorage.setItem('userName', userName);
    window.localStorage.setItem('userId', userId);
  }

  public dialogUpdateUserParametrs(userParametrs: IUserParametrs): void {
    const dialogRef = this._dialog.open(UpdateUserParametrsComponent, {data: userParametrs});

    dialogRef.afterClosed().subscribe((result: IUserParametrsRequest) => {
      if (!result) return;
      this.updateUserParametrs(result).subscribe(() => {
        this.eventUpdateUserParametrs.emit();
      });
    });
  }
}
