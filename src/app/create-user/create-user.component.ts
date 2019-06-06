import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  hasBeenSubmittedOnce = false;

  errorMessage: string;
  success = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dateOfBirth: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])]
    });
  }

  onSubmit() {
    this.hasBeenSubmittedOnce = true;

    if (this.createUserForm.invalid) {
      return;
    }

    this.userService.createUser(this.createUserForm).subscribe(
      (result) => {
        this.success = true;
      },
      (error) => {
        this.success = false;
        this.errorMessage = "Failed to create user: " + error['error']['message'];
      }
    );
  }

}
