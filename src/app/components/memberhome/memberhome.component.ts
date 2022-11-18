import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/member.service';

@Component({
  selector: 'app-memberhome',
  templateUrl: './memberhome.component.html',
  styleUrls: ['./memberhome.component.css']
})
export class MemberhomeComponent implements OnInit {
  bills: any;

  constructor(private service:MemberService, private router:Router) { }

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

}
