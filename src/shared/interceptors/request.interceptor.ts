import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { OverlaysService } from '../overlays';
import { AlertController } from '@ionic/angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const includeAssets = request.url.includes('assets');

    if (!includeAssets) {
      request = request.clone({
        url: environment.baseUrl + request.url,
      });
    }

    return next.handle(request);
  }
}
