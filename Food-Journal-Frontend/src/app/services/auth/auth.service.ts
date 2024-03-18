import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login';
import { IRegister } from '../../interfaces/register';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserParametrs, IUserParametrsRequest, IUserStandart } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserParametrsComponent } from '../../components/dialogs/update-user-parametrs/update-user-parametrs/update-user-parametrs.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public eventUpdateUserParametrs: EventEmitter<any> = new EventEmitter<any>();
  public eventUserStandart: EventEmitter<IUserStandart> = new EventEmitter<IUserStandart>();

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
    let decodedAuthDataString = decodeURIComponent(escape(authDataString));
    let userData = JSON.parse(decodedAuthDataString);
    
    let userName = userData.name;
    let userId = userData.id;
    
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

  public calculateCalorieIntake(userParams: IUserParametrs): IUserStandart {
    let BMR: number;
    if (userParams.age === -1 ||
        userParams.height === -1 ||
        userParams.weight === -1) {
      return {
        kkal: -1,
        proteins: -1,
        fats: -1,
        carbohydrates: -1
      };
    }
    
    if (userParams.gender === 1) {
      BMR = 88.362 + (13.397 * userParams.weight) + (4.799 * userParams.height) - (5.677 * userParams.age);
    } else {
      BMR = 447.593 + (9.247 * userParams.weight) + (3.098 * userParams.height) - (4.330 * userParams.age);
    }
    
    let activityMultiplier: number;
    switch (userParams.activity) {
      case 1:
        activityMultiplier = 1.2;
        break;
      case 2:
        activityMultiplier = 1.375;
        break;
      case 3:
        activityMultiplier = 1.55;
        break;
      case 4:
        activityMultiplier = 1.725;
        break;
      default:
        activityMultiplier = 1.2; // по умолчанию считаем сидячий образ жизни
    }
    
    let calorieIntake = BMR * activityMultiplier;
    
    switch (userParams.goal) {
      case 1:
        calorieIntake -= 500;
        break;
      case 2:
        // Поддерживаем текущий уровень калорий
        break;
      case 3:
        calorieIntake += 500;
        break;
      default:
        // Ничего не делаем
    }
    
    const proteinGrams = Math.round(userParams.weight * 2); // Примерное количество белков в граммах
    const fatGrams = Math.round(calorieIntake * 0.3 / 9); // Примерное количество жиров в граммах
    const carbGrams = Math.round(calorieIntake * 0.5 / 4); // Примерное количество углеводов в граммах
    
    return {
      kkal: Math.round(calorieIntake),
      proteins: proteinGrams,
      fats: fatGrams,
      carbohydrates: carbGrams
    };
}
}
