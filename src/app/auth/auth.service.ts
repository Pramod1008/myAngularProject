import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient,private router: Router) {}
  user = new BehaviorSubject<User>(null);

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identityt  oolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA22cZFbywuP79jZTSRDKjS0ETNeybPbOY',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError)
      ,
      tap(resData => {
        this.handleAuthentication(
          resData.email, 
          resData.localId, 
          resData.idToken,
          +resData.expiresIn );
      })
      );
  }

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loaduser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

      if(loaduser.token){
        this.user.next(loaduser);
      }
  }

  login(email: string, password: string){
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA22cZFbywuP79jZTSRDKjS0ETNeybPbOY',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email, 
          resData.localId, 
          resData.idToken,
          +resData.expiresIn );
      })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    ){
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      localStorage.setItem('userdata',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password'
    }
    return throwError(errorMessage);
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['auth']);
  }
}
