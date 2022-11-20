import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/claim.service';
import { MemberService } from 'src/app/member.service';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-memberhome',
  templateUrl: './memberhome.component.html',
  styleUrls: ['./memberhome.component.css']
})
export class MemberhomeComponent implements OnInit {
  bills: any;
  ispopup: boolean;

  constructor(private service:MemberService, private router:Router, private policyService:PolicyService, private claimService:ClaimService) { }

  ngOnInit(): void {
  }

  viewBills(){
    const observable: Observable<any> = this.service.viewBills();
    observable.subscribe((response: any) => {
      let navigationExtras: NavigationExtras = {
        state: {
          bills: response
        }
      };
      this.router.navigate(['claim/bills'], navigationExtras);
    },
      error => {
        alert("something went wrong" + error)
      }
    )
  }

  getPolicies() {
    const observable: Observable<any> = this.policyService.getAllPolicies();
    observable.subscribe((response: any) => {
      let navigationExtras: NavigationExtras = {
        state: {
          policies: response
        }
      };
      this.router.navigate(['claims'], navigationExtras);
    },
      error => {
        alert("something went wrong" + error)
      }
    )
  }

  viewStatus() {
    const observable: Observable<any> = this.claimService.viewStatus();
    observable.subscribe((response: any) => {
      let navigationExtras: NavigationExtras = {
        state: {
          claims: response
        }
      };
      this.router.navigate(['claims/viewStatus'], navigationExtras);
    },
      error => {
        alert("something went wrong" + error)
      }
    )
  }

  closePopup(){
    this.ispopup = false;
  }

  cancel() {
    this.router.navigateByUrl("");
  }

}
