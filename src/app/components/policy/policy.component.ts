import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policyFormGroup: FormGroup;
  policy: any;
  memberId: Number;
  policyNumber: Number;
  policyName: string;
  coverage: number;
  premiumAmount: Number;
  premiumPaymentFrequency: Number;
  subscriptionDate: Date = new Date();
  errorMsg: any;
  myFinalValue: number;

  ngOnInit(): void {
    this.policyFormGroup = this.formBuilder.group({
      coverage: new FormControl('', Validators.required),
      premiumPaymentFrequency: new FormControl('', Validators.required),
      subscriptionDate: new FormControl('', Validators.required)
    });
  }

  constructor(private service: PolicyService, private formBuilder: FormBuilder, private router: Router) {
    if (history.state.policy && history.state.memberId) {
      console.log(history.state.policy)
      this.policy = history.state.policy;
      this.memberId = history.state.memberId;
      this.policyNumber = this.policy.policyNumber
      this.policyName = this.policy.policyName
    }
  }

  valueUpdated(event:any) {
    if(event.target.value == 100000){
      this.premiumAmount = 4000
    }
    else if(event.target.value == 200000){
      this.premiumAmount = 5000
    }
    else if(event.target.value == 300000){
      this.premiumAmount = 6000
    }
    else if(event.target.value == 500000){
      this.premiumAmount = 12000
    }
    else if(event.target.value == 1000000){
      this.premiumAmount = 25000
    }
  }

  enrollPolicy() {
    console.log('saved');
    
    const observable = this.service.enrollPolicy(this.policyNumber,this.policyName,this.coverage,this.premiumAmount,this.premiumPaymentFrequency,this.subscriptionDate);
    observable.subscribe(response => {
      console.log(response);
      alert("Policy subscribed successfully")
    },
      error => {
        if (error.status == 400) {
          this.errorMsg = error.error.error
        }
        else {
          this.errorMsg = "Something went wrong! Please try again";
        }
      })

  }

  get f() {
    return this.policyFormGroup.controls;
  }
  

  cancel() {
    this.router.navigateByUrl("");
  }

}
