import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  providerDetails:Array<any> = [];

  constructor(private service: PolicyService, private formBuilder: FormBuilder, private router: Router) {
    if (history.state.providers) {
      console.log(history.state.providers)
      this.providerDetails = history.state.providers;
    }
  }

  ngOnInit(): void {
  }

}
