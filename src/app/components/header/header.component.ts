import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PolicyService } from 'src/app/policy.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  user:User;
  providerDetails: any;

  constructor(private service:UserService, private router: Router,private policyService:PolicyService) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(){
    let userDetails = sessionStorage.getItem('currentUser')
    this.isAuthenticated = this.service.isLoggedIn();
    return this.isAuthenticated;
  }

  logout() {
    this.service.logout();
    this.isAuthenticated = false;
    this.router.navigate(['']);
}

getProviders() {
  const observable: Observable<any> = this.policyService.getAllProviders();
  observable.subscribe((response: any) => {
    let navigationExtras: NavigationExtras = {
      state: {
        providers: response
      }
    };
    this.router.navigate(['provider'], navigationExtras);
  },
    error => {
      alert("something went wrong" + error)
    }
  )
}

}
