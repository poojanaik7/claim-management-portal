import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  coverage: Number;
  premiumAmount: Number;
  premiumPaymentFrequency: Number;
  subscriptionDate: Date = new Date();

  getAllPolicies(){
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['token']
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization','Bearer ' + token)
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get("http://localhost:8003/policy/preview/policies", {
      headers: headers
    })
  }

  getAllProviders(){
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['token']
    return this.http.get("http://localhost:8003/policy/viewChainOfProvider", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  
  enrollPolicy(policyNumber: Number , policyName: string, coverage: any,premiumAmount: Number,
    premiumPaymentFrequency: Number,subscriptionDate: Date = new Date()) {
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['accessToken'];
    const memberId: any = JSON.parse(currentUser || '{}')['id'];
    
    return this.http.post( "http://localhost:8003/policy/enrolPolicy", {policyNumber, policyName,memberId,coverage,premiumAmount,premiumPaymentFrequency,subscriptionDate}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
