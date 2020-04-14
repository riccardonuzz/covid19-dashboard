import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { baseUrl } = environment;
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
      // headers: new HttpHeaders({
      //   'Cache-Control': 'no-cache',
      //   'Pragma': 'no-cache',
      //   // 'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      // })
    });
    return next.handle(apiReq);
  }
}
