import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiUrlDocker);
    let headers = request.headers.set('Content-Type', 'application/json');
   
    if (this._authService.accessToken && isApiUrl) {
      headers = headers.set('Authorization', `Bearer ${this._authService.accessToken}`);
    }
    
    request = request.clone({
      headers: headers
    });
   
    return next.handle(request);
  }
}
