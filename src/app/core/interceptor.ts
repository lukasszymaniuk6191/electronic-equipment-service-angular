import {Injectable} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;

    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }
      , (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('err.status' + err.status);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }if (err.status === 400) {
            console.log(err);
          }
          else {
            this.router.navigate(['/error']);
          }
        }
      }
    );
  }


}
