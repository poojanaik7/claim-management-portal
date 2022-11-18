import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/member.service';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  policyDetails: any;
  user:any

  constructor(private policyService:PolicyService, private router:Router) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('currentUser')
    this.details() 
  }

 
  details() {
    const observable: Observable<any> = this.policyService.getAllPolicies();
    observable.subscribe((response: any) => {
      this.policyDetails = response;
    },
      error => {
        alert("something went wrong" + error)
      }
    )
  }

  enrollPolicy(policy:any){
    const currentUser = sessionStorage.getItem('currentUser');
    const id: any = JSON.parse(currentUser || '{}')['id'];
    let navigationExtras: NavigationExtras = {
      state: {
        policy: policy,
        memberId:id
      },
    };
    this.router.navigate(['policy/enrollPolicy'],navigationExtras)
    this.ngOnInit();
  }


}
