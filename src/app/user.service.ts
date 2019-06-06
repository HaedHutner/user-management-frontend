import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public createUser(createUserForm: FormGroup) {
    const requestBody = {};
    requestBody['firstName'] = createUserForm.value['firstName'];
    requestBody['lastName'] = createUserForm.value['lastName'];
    requestBody['email'] = createUserForm.value['email'];
    requestBody['dateOfBirth'] = createUserForm.value['dateOfBirth'];
    requestBody['rawPassword'] = createUserForm.value['password'];
    return this.httpClient.post(`${this.api}/api/user/create`, requestBody);
  }

  public getUsers(pageParam: number, amountPerPage: number, sortBy?: string) {
    return this.httpClient.get(`${this.api}/api/user/query`, {
      params: {
        page: pageParam.toString(),
        size: amountPerPage.toString(),
        sort: sortBy ? sortBy : ""
      }
    })
  }

  public deleteUser(userId: number) {
    this.httpClient.delete(`${this.api}/api/user/${userId}/delete`).subscribe(result => {
      
    });
  }

}
