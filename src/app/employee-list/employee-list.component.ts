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

  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    var token = '' + localStorage.getItem('auth_token');
    this.employees$ = this.http.get<Employee[]>('/employeeService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
    });
    
  }

}
