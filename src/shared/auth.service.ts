import { Injectable } from '@angular/core';
import { shareReplay, pluck, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Group } from 'src/entities/group';

interface State {
  user?: Group;
  token?: string;
  isLogged: boolean;
  loading: boolean;
  error?: Object;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initialState: State = {
    isLogged: false,
    loading: false,
  };



  public loggedUserSubject$ = new BehaviorSubject<State>(this.initialState);
  loggedUser$ = this.loggedUserSubject$.asObservable();

  constructor(
    private _http: HttpClient,
    private splashScreen: SplashScreen
  ) {
    const token = localStorage.getItem('tokenDecide');
    this.splashScreen.hide();
    if (token) {
      const user = JSON.parse(localStorage.getItem('groupDecide'));
      this.loggedUserSubject$.next({
        user: user ? new Group(user) : null,
        loading: false,
        isLogged: true,
      });
     
    }
  }

  public create(newEntity) {
    const url = '/Group';
    const request = this.postRequest(url, newEntity);
    request.subscribe(entity => { });
    return request;
  }

  login(credentials) {
    const request = this._http.post('/Gropu/Login', credentials).pipe(
      shareReplay(),
      tap<any>(({ token, refresh }) => {

        localStorage.setItem('tokenDecide', token);
       
      }),
      switchMap(() => this.getCurrentGroup())
    );
    return request;
  }

  logout() {
    const request = this._http.get('/Group/Logout').pipe(shareReplay());

    request.subscribe(() => this.clearLocalData(), () => this.clearLocalData());
    return request;
  }

  private clearLocalData() {
    localStorage.removeItem('tokenDecide');
    localStorage.removeItem('groupDecide');
  }

  public getCurrentGroup() {
    const url = '/Group';
    const request = this.getRequest(url);
    request.subscribe(
      user => {
        localStorage.setItem('groupDecide', JSON.stringify(user));
        this.loggedUserSubject$.next({
          user: user ? new Group(user) : null,
          loading: false,
          isLogged: true,
        });
      },
      error => {
        this.clearLocalData();
      }
    );
    return request;
  }

  get currentUser() {
    return this.loggedUserSubject$.getValue().user;
  }

  protected postRequest(url: string, body = {}) {
    return this._http.post(url, body).pipe(shareReplay());
  }

  protected getRequest(url: string, params = {}) {
    return this._http.get(url, { params }).pipe(shareReplay());
  }

  protected deleteRequest(url: string) {
    return this._http.delete<{ success: boolean }>(url).pipe(shareReplay());
  }
}
