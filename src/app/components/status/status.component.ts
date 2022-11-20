import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/claim.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  policies: any;
  claims: any;

  constructor(private service:ClaimService) { 
    if (history.state.claims) {
      console.log(history.state.claims)
      this.claims = history.state.claims;
    }
  }

  ngOnInit(): void {
  }

}
