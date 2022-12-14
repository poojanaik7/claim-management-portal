import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/member.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: any;
  msg:string

  constructor(private service:MemberService) {
    if (history.state.bills) {
      console.log(history.state.bills)
      this.bills = history.state.bills;
    }
    if(this.bills.length==0){
       this.msg = "no bills found"
    }
   }

  ngOnInit(): void {
  }

  

}
