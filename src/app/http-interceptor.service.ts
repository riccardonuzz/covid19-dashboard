import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { baseUrl } = environment;
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
      setParams: {
        noCache: new Date().getTime().toString()
      }
    });
    return next.handle(apiReq);
  }
}
