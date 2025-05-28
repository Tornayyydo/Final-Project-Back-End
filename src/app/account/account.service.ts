import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null) {
    if (!token) {
      this.currentUserSource.next(null as unknown as IUser);
      return of(null);
    }

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'account', { headers }).pipe(
        map((user: IUser) => {
            if (user) {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            } else {
                this.currentUserSource.next(null as unknown as IUser);
            }
            return user;
        }),
        catchError(error => {
            console.log(error);
            this.currentUserSource.next(null as unknown as IUser);
            return of(null);
        })
    );
  }

  login(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }

  register(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    this.currentUserSource.next(null as unknown as IUser)
    this.router.navigateByUrl('/')
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email)
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl + 'account/address')
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
