import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/claim.service';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  policyNumber: Number;
  policyName: string;
  providerName: string;
  benefitsAvailed: string;
  billAmount: Number;
  claimAmount: Number;
  claimDate: Date = new Date();
  errorMsg: any;
  claimForm: FormGroup;
  providers:any
  policies: any;
  ispopup: boolean;

  constructor(private router: Router, private service: ClaimService, private formBuilder:FormBuilder,private policyService: PolicyService) {
    if (history.state.policies) {
      this.policies = history.state.policies;
      this.policyName=this.policies.policyName
    }
   }

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      providerName: new FormControl('', Validators.required),
      benefitsAvailed: new FormControl('', Validators.required),
      billAmount: new FormControl('', Validators.required),
      claimAmount:new FormControl('', Validators.required),
      claimDate: new FormControl('', Validators.required)
    });
  }

  submitClaim() {
    console.log('saved');
    const observable = this.service.submitClaim(this.policyNumber,this.policyName,this.providerName,this.benefitsAvailed,this.billAmount,this.claimAmount,this.claimDate);
    observable.subscribe((response: any) => {
      console.log(response);
      this.router.navigate([''])
    },
      error => {
        if (error.status == 200) {
          this.router.navigate([''])
        }
        else {
          this.errorMsg = "Something went wrong! Please try again";
        }
      })
  }


  closePopup(){
    this.ispopup = false;
  }

  cancel() {
    this.router.navigateByUrl("");
  }

  get f() {
    return this.claimForm.controls;
  }

}
