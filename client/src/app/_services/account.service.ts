import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  /* Detailed notes about BehaviorSubject is available at 
     Udemy - Building an App with ASP.NET Core and Angular.onenote:22.7 point */
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  /* Detailed Notes is available at
     Udemy - Building an App with ASP.NET Core and Angular.onenote:22.6 point */
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  /* This is just the convenient method to use this from our component */
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  
  logout() {
    localStorage.removeItem('user');
    /* Set currentUserSource to null if the current user is logged out */
    this.currentUserSource.next(null);
  }
}
