import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(public auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();
    const headers = req.headers
      .set("Authorization", "Bearer " + authToken);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
