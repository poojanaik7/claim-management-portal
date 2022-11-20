import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http:HttpClient) { }

  submitClaim(policyNumber: Number , policyName: string, providerName: string,benefitsAvailed: string,
    billAmount: Number,claimAmount: Number,claimDate: Date = new Date()) {
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['token'];
    const memberId: any = JSON.parse(currentUser || '{}')['id'];
    
    return this.http.post( "http://localhost:9191/claims/submitClaim", {policyNumber, policyName,memberId,providerName,benefitsAvailed,billAmount,claimAmount,claimDate}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  viewStatus(){
    const currentUser = sessionStorage.getItem('currentUser');
    const token: any = JSON.parse(currentUser || '{}')['token']
    return this.http.get("http://localhost:8001/claims/viewClaimStatus", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
