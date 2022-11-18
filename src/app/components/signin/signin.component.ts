import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  isLoggedin: boolean = false;
  ispopup: boolean = false;
  errorMsg: string;

  username = "";
  password = "";
  users: User;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.signinForm.controls;
  }

  signin() {

    const observable: Observable<User> = this.userService.signinUser(this.username, this.password);
    observable.subscribe((response: User) => {

      this.users = response;
      this.router.navigate([''])

    },
      error => {
        this.ispopup = true;
        this.errorMsg = error.error;
      }
    )
  }

  closePopup() {
    this.ispopup = false;
  }

}
