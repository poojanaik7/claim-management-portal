import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  viewBills() {
    let params = new HttpParams();
    const currentUser = sessionStorage.getItem('currentUser');
    const id: any = JSON.parse(currentUser || '{}')['id'];
    const token: any = JSON.parse(currentUser || '{}')['token']
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization','Bearer ' + token)
    .set('Access-Control-Allow-Origin', '*');
    params = params.append("memberId", id)
    return this.http.get("http://localhost:8003/policy/viewBills", {
      params, headers: headers
    })
  }

}
