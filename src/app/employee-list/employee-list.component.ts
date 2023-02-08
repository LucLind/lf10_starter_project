import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  employeeList: Employee[];

  searchTerm: string = '';

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.employeeList = [];
    this.fetchData();
  }

  onSearchTermEntered(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  search(e: Employee) {
    if (e != undefined) {
      if (this.searchTerm === '' || e.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || e.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  fetchData() {
    var token = localStorage.getItem('token');
    this.employees$ = this.http.get<Employee[]>('/employeeService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
    this.employees$.subscribe(list => {
      this.employeeList = list;
    })
  }

}
