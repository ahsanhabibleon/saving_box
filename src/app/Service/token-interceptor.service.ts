import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  map,
  catchError,
  finalize,
  retryWhen,
  delay,
  tap,
} from "rxjs/operators";
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    public authService: AuthService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    public compService: UtilsService,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.authenticated) {
      var token = localStorage.getItem("accessToken");
    }

    this.loadingCtrl.getTop().then((hasLoading) => {
      if (this.authService.loaderSubject.value) {
        if (!hasLoading) {
          this.loadingCtrl
            .create({
              spinner: "crescent",
              translucent: true,
              id: "intercept",
              showBackdrop: true,
              animated: true,
              mode: 'ios'
            })
            .then((loading) => loading.present());
        }
      }
    });
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     setHeaders: {
    //       'content-type': 'application/json'
    //     }
    //   });
    // }

    // request = request.clone({
    //   headers: request.headers.set('Accept', 'application/json')
    // });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
          if (event.status === 200) {
            if (event.body.message != null && event.body.message != "") {
              this.compService.presentToast(event.body.message, "success");
            }
          }
        }
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          let errorMsg = `${error.error.message}`;
          this.compService.presentToast(errorMsg, "danger");
          switch ((<HttpErrorResponse>error).status) {
            case 401:
              //this.authService.logout();
              console.log("401");
            // localStorage.clear();
            default:
              return throwError(error);
          }
        } else {
          return throwError(error);
        }
      }),
      finalize(() => {
     setTimeout(()=>{
      this.loadingCtrl.getTop().then((hasLoading) => {
        if (hasLoading) {
          this.loadingCtrl.dismiss();
        }
      });
     },300);
      })
      //If Api fails then we can run it again

      //     retryWhen(err=>{
      //       let retries = 1;
      // return err.pipe(
      //   delay(1000),
      //   tap(() => {
      //   }),
      //   map(error => {
      //     if (retries++ === 2) {
      //       throw error; // Now retryWhen completes
      //     }
      //     return error;
      //   })
      // );
      //     })
    );
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }
}
