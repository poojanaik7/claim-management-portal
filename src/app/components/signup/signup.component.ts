import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  username: "";
  email: "";
  password: "";
  contactNumber: 123456789;
  address: "";
  dob: Date = new Date();

  ispopup: boolean = false;
  errorMsg: string;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  signup() {
    const observable: Observable<any> = this.userService.registerUser(this.username, this.email, this.password, this.contactNumber,this.address,this.dob);
    observable.subscribe((response: any) => {
      // console.log(this.user)
      console.log(response);
      this.router.navigate(['signin'])
    },
      error => {
        console.log(error.error);
        this.ispopup = true;
        
        this.errorMsg = error.error.message;
      }
    )
  }

  closePopup() {
    this.ispopup = false;
  }

}
