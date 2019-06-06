import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId: number;

  updateUserForm: FormGroup;
  hasBeenSubmittedOnce = false;

  success = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dateOfBirth: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe(result => {
        this.updateUserForm.setValue({
          firstName: result['firstName'],
          lastName: result['lastName'],
          email: result['email'],
          dateOfBirth: result['dateOfBirth']
        })
      });
    });
  }

  onSubmit() {
    this.hasBeenSubmittedOnce = true;

    if (this.updateUserForm.invalid) {
      return;
    }

    this.userService.updateUser(this.userId, this.updateUserForm).subscribe(      
      (result) => {
        this.success = true;
        this.router.navigate(['users']);
      },
      (error) => {
        this.success = false;
        this.errorMessage = "Failed to update user: " + error['error']['message'];
      }
    );
  }

}
