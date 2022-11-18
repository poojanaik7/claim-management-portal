import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  isLoggedin: boolean;


  constructor(private http: HttpClient) { }

  signinUser(username: string, password: string) {
    return this.http.post<any>("http://localhost:8002/members/signin", { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedin = true;
        }
        return user;
      }));
  }

  registerUser(username: string, email: string, password: string, contactNumber:Number, address: string, dob: Date) {
    return this.http.post("http://localhost:8002/members/signup" , { username, email, password, contactNumber,address,dob })
  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.isLoggedin = false;
  }

  isLoggedIn() {
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['token']
    if(!token){
     this.isLoggedin = false;
    }
    else{
      this.isLoggedin = true;
    }
    return this.isLoggedin;
  }


}
