import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { Employee } from "../Employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzQ2NTUzNjgsImlhdCI6MTY3NDY1MTc2OCwianRpIjoiNTkzMzZlYWYtNDkzMS00ZDI4LTliYWUtNjAyYjRhOWQwMTZjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJmODhjOTFhNi00ZWFmLTQ5YjgtOTgyOS1hNTE0YTFjMDQ0MTQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.BtUvbPSbi-O15uxuBdLVJlOdF4vG6iE-SRQ_YAYfQyfh2gdN-v4CExn6QPGOaiB7E333tunCrayzUgHMZtS7ZxJDpCJzSpslQvpXh8PTn3uH-NHtfkegcugzeXUl8dZnzastwU81mecbZyzoMWAtW0jMcQi53dZp1rIidV39JxEo0YY_jpifN384Q0jW7lcgYFqrKSNxRKakd3doo9zq4offDJWGeF_GIAMfPVXm8E2BAaF0TA3xGRtusgsm_s1A50q19dUEEI4YJR47f3gODhrW_B7fPxdGrh6bTpCNLdzwupVWELfMl_KXMvlSDofr6F7eSr53aSE8_1P8EiC1sw';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

}
