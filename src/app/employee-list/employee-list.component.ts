import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from "rxjs";
import { Employee } from "../Employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employees$: Observable<Employee[]>;
  employeeList: Employee[];

  @Input()
  qualificationOptions: Qualification[] = [];

  searchTerm: string = '';

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.employeeList = [];
    this.fetchData();
  }

  onSearchTermEntered(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
  onQualiFilterEntered(quali: Event) {
    const qualiId = (quali.target as HTMLInputElement).value;
    if (qualiId === 'all') {
      this.fetchData();
      return;
    }

    this.http.get<any>(`/qualificationsService/${qualiId}/employees`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(list => {
      this.employeeList = list.employees.map((e: any) => {
        return {
          id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
        }
      });
    });
  }

  search(e: Employee) {
    if (e != undefined) {
      const combinedFirstLast = e.firstName + " " + e.lastName;
      const combinedLastFirst = e.lastName + " " + e.firstName;

      if (this.searchTerm === '' ||
        e.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        combinedFirstLast.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        combinedLastFirst.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/employeeService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
    this.employees$.subscribe(list => {
      this.employeeList = list;
    })
  }

}
