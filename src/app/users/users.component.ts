import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  amountPerPage: number = 10;

  currentPage: number = 0;

  userList: Array<any> = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers(this.currentPage, this.amountPerPage).subscribe(result => {
      this.userList = result.content;
    })
  }

  nextPage() {
    this.userService.getUsers(this.currentPage + 1, this.amountPerPage).subscribe(result => {
      if (result.content.length == 0) {
        return;
      } else {
        this.userList = result.content;
        this.currentPage = this.currentPage + 1;
      }
    });
  }

  sortList(e) {
    this.userService.getUsers(this.currentPage, this.amountPerPage, e.target.value).subscribe(result => {
      this.userList = result.content;
    });
  }

  previousPage() {
    if (this.currentPage == 0) {
      return;
    }

    this.userService.getUsers(this.currentPage - 1, this.amountPerPage).subscribe(result => {
      this.userList = result.content;
      this.currentPage = this.currentPage - 1;
    });
  }

  deleteUser(userId: number) {
    this.userList = this.userList.filter(user => user.id != userId);
    this.userService.deleteUser(userId);
  }
}
