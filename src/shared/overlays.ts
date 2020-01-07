import { Injectable } from '@angular/core';
import { from, forkJoin, of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, delayWhen, switchMap, shareReplay, startWith } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class OverlaysService {
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {}

 /* presentConfirm(message: string) {
    return Observable.create(async observer => {
      const alert = await this.alertController.create({
        message: message,
        buttons: [
          {
            text: this.translate.instant('ACTIONS.DISCARD_CHANGES'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => observer.error('error')
          },
          {
            text: this.translate.instant('ACTIONS.CONFIRM'),
            handler: () => {
              observer.next(true);
              observer.complete();
            }
          }
        ]
      });
      alert.present();
    });
  }*/

  /*presentSuccess(message: string) {
    return Observable.create(async observer => {
      const alert = await this.alertController.create({
        message: this.translate.instant(message),
        buttons: [
          {
            text: this.translate.instant('ACTIONS.CONFIRM'),
            handler: () => {
              observer.next(true);
              observer.complete();
            }
          }
        ]
      });
      alert.present();
    });
  }*/

  requestWithLoaderAndError(request: () => Observable<any>, message?) {
    let obs = of({}).pipe(
      this.presentLoader(),
      switchMap(() => request().pipe(this.onErrorDismissLoaderAndPresentError())),
      this.dismissLoader(),
      shareReplay()
    );

    if (message) {
      obs = obs.pipe(this.presentToast(message));
    }

    obs.subscribe(() => {});
    return obs;
  }

  buildLoader(obs: Observable<any>) {
    return obs.pipe(
      mapTo(false),
      catchError(() => of(false)),
      startWith(true),
      shareReplay()
    );
  }

  presentLoader() {
    return delayWhen(() => from(this.presentIonicLoader()));
  }

  dismissLoader() {
    return delayWhen(() => from(this.dismissIonicLoader()));
  }

  onErrorDismissLoaderAndPresentError() {
    return catchError(error => {
      return forkJoin(from(this.dismissIonicLoader()), from(this.presentError(error))).pipe(switchMap(() => throwError({ error: error })));
    });
  }

  async presentError(error) {
    let e = !error.error ? error : error.error[0].mensaje ? error.error[0].mensaje : error.error.Message;
    //let e = error.error[0].mensaje ? error.error[0].mensaje : error.error.Message ? error.error.Message : error;
    const message = e ? e : error.error;

    const alert = await this.alertController.create({
      message:  message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentSuccess(message){
    const alert = await this.alertController.create({
      message:  message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentErrorMessage(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  presentToast(message) {
    return delayWhen(() => from(this.presentIonicToast(message)));
  }

  private async presentIonicLoader() {
    if (!(await this.loadingController.getTop())) {
      const loading = await this.loadingController.create();
      await loading.present();
    }
  }

  private async dismissIonicLoader() {
    if (await this.loadingController.getTop()) {
      await this.loadingController.dismiss();
    }
  }

  private async presentIonicToast(message) {
    const toast = await this.toastController.create({
      message:message,
      duration: 5000
    });
    await toast.present();
  }
}
