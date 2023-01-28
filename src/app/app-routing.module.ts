import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import{EmployeeListComponent} from "./employee-list/employee-list.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employees/:id', component: EmployeeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzQ5MjI2MzMsImlhdCI6MTY3NDkxOTAzMywianRpIjoiZmFhZGZiNGYtZmEyZS00N2Y1LWJjYTYtNTVmN2ZiMGQyYjZjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5MGI1YjZlNy03YmUwLTQ1N2ItYTI3MS04ZTI5ZWVhMjQ3YmYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.BNNUL3-xsuxYqRVOd3MtJf38BmRGN0B6VV_XkOOZSdrR7aOIf4yxrCuwJphbQ3tjzgyM4QrecP0B6o3BK6yyrbg6sQQpZIFAqp5S49HyyNkMF3-iNRwrfHWILIYPhZXEK5piEhu7jLDy7kQ-qHn7RTxKl8LmvFYQnBVJDXz3Janog6MSVAj5T-3Fo__5Ojm6olpz0zRZXS-L8jh-ABaKTBjrNzReD-2YxwvHNU0LWZT4ugk3eWaW6bZa-wKTy6NeU3t6Vfhh4fig7KpQRly7E2Hu9myIy63NX57jhG1856bCn23vLpB9YoQdJDVhN2imtlB0olUoyFDhwWyzLYURyA';
 
  constructor(){
    localStorage.setItem('auth_token', `Bearer ${this.bearer}`);
  }
}
