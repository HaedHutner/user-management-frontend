import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component'
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: "", component: UsersComponent },
  { path: "users", component: UsersComponent },
  { path: "users/create", component: CreateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }