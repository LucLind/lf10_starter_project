import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzQ3NDU3ODAsImlhdCI6MTY3NDc0MjE4MCwianRpIjoiYWU3N2U3MTQtMWY3MC00OTg3LWE1NTQtOTliODA0MTdkMzA4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIyZjdiOTMyNC0wN2RmLTQxNTItODVhNi0wZWNlYjkxNGY2NTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.XUggJ1OydU7Y6fXID7iDzDbpC-wnsRgM0yMJH8e_kvFL6WG_FaP0Seco54vCWcrDgqxstqnRbBUaO5lGp6tRskG08VKXu3QRj9ZJemGgzxWpVhttDF9gwKVJ8VVdQYolJZHH5kh15r2ne6puEic4i4lEUUE0Rf8C_-wnueSoyPmOXrcA3gJrTQAzPpREIqMRaP8J004dN-81QtBRbCM8zukJDrDrhzglitk9w00a_7PfMswrBBI06elUjFvnCUbq_FT48i5F0qXAQz9lTwJp_pWvu-w425awdxiactbQqf8LUTklKAxXVoRytSPqnD4R9rPzCD0FUvzfszyLhGGS1Q';
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
