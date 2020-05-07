import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take, filter, switchMap, finalize } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ setHeaders: { 'content-type': 'application/json' } });

    return next.handle(req);
  }
}
