import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization','Bearer ' + token)
    .set('Access-Control-Allow-Origin', '*');
    
    return this.http.post( "http://localhost:8001/claims/submitClaim", {policyNumber, policyName,memberId,providerName,benefitsAvailed,billAmount,claimAmount,claimDate}, {
      headers: headers
    })
  }

  viewStatus(){
    let params = new HttpParams();
    const currentUser = sessionStorage.getItem('currentUser');
    const id: any = JSON.parse(currentUser || '{}')['id'];
    const token: any = JSON.parse(currentUser || '{}')['token']
    params = params.append("memberId", id)    
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization','Bearer ' + token)
    return this.http.get("http://localhost:8001/claims/viewClaimStatus", {
      params , headers: headers
    })
  }
}
