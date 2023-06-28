import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiURLUsers } from 'src/app/config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // users: User[] = [
  //   { username: 'admin', password: '123', roles: ['ADMIN'] },
  //   { username: 'joel', password: '123', roles: ['USER'] },
  // ];
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles: string[];
  token!: string;
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {}

  login(user: User) {
    return this.http.post<User>(apiURLUsers + '/login', user, {
      observe: 'response',
    });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    console.log('roles :' + this.roles);
    this.loggedUser = decodedToken.sub;
  }

  getToken(): string {
    return this.token;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  // SignIn(user: User): Boolean {
  //   let validUser: Boolean = false;
  //   this.users.forEach((curUser) => {
  //     if (
  //       user.username == curUser.username &&
  //       user.password == curUser.password
  //     ) {
  //       validUser = true;
  //       this.loggedUser = curUser.username;
  //       this.isloggedIn = true;
  //       this.roles = curUser.roles;
  //       localStorage.setItem('loggedUser', this.loggedUser);
  //       localStorage.setItem('isloggedIn', String(this.isloggedIn));
  //     }
  //   });
  //   return validUser;
  // }

  isAdmin(): Boolean {
    return !this.roles ? false : this.roles.indexOf('ADMIN') >= 0;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    // this.getUserRoles(login);
  }

  // getUserRoles(username: string) {
  //   this.users.forEach((curUser) => {
  //     if (curUser.username == username) {
  //       this.roles = curUser.roles;
  //     }
  //   });
  // }

  logout() {
    this.loggedUser = undefined;
    this.roles = undefined;
    this.token = undefined;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    // localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
}
