import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import{EmployeeListComponent} from "./employee-list/employee-list.component";
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './keykloak.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard]},
  { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuard]},
  { path: 'employees/:id', component: EmployeeEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  //bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzQ5NDMxODIsImlhdCI6MTY3NDkzOTU4MiwianRpIjoiNWNjYzlmYjYtOWI5NS00M2FkLTg4MjgtMjY3OGYwNWY5ZjM3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI2M2Y4ZGJiYi04ZjIzLTQ2NzYtYWMyOS03N2EyZDdiZTFlYjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Z5d95bmvKWw78MVnen9BetyknshCrGYgQZWr-g8ob86AW72FIPagTvEAFxwaKwsQTRS1lDTJyNzqHdakXXlvc8z0O_BAeuuaVaDVYxK31XZK7xQlwhAZw3RFLsOvvVgiSyTrqDg01M4D20T2jzrr-6VHeNnTdEb8oFrdcKu8nSPQ2cu81-RI5Iu2XNUYPXnFeRe2zWE9KLjFpt4y_E5eCNLCqgEiUk71Fz1i-yvMCN4LzcRyiGG6lG5iLe_YjggBCYmu80bjj2HvTcyEybvFIbJVpgixOcwN7f4DecoxNjLKSrgoOvh9hiKyQdx4vPVoo2Kbr1SMel7Buqh8-f1_DA';
 
  constructor(){
    //localStorage.setItem('auth_token', `Bearer ${this.bearer}`);
  }
}
