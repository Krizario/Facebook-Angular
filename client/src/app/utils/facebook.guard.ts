import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth, private authService: AuthService, private router : Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData
    .pipe(
      map(user => user != null),
      tap(value => {
        if(!value) {
          this.router.navigateByUrl('/login')
          .then();
          return value;
        }
        else {
          return value;
        }
      })
    )
  }
  
}
