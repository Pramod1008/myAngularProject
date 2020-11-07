import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData{
    kind: String;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: String;
    localId: string;

}

@Injectable({
    providedIn : "root"
})
export class AuthService{

    constructor(private http : HttpClient){}

    signUp(email : string,password : string){
       return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyA22cZFbywuP79jZTSRDKjS0ETNeybPbOY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            );
    }

}