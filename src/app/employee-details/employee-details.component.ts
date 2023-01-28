import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  employee: Observable<Employee>;
  id;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.employee = of();
    this.fetchData();
  }

  fetchData() {
    let token = '' + localStorage.getItem('auth_token');
    this.employee = this.http.get<Employee>(`/employeeService/${this.id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
    });
  }
}
