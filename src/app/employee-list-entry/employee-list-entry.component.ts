import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-employee-list-entry',
  templateUrl: './employee-list-entry.component.html',
  styleUrls: ['./employee-list-entry.component.css']
})
export class EmployeeListEntryComponent implements OnInit {
  @Input()
  public employee :Employee = new Employee() ;
  public qualifications : Qualification[];

  constructor(private http: HttpClient) {
    this.qualifications = new Array<Qualification>;

  }
  ngOnInit(){
    this.fetchData();
  }

  fetchData() {
    let that = this;
    this.http.get<any>(`/employeeService/${this.employee.id}/qualifications`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      next(value:any){
        that.qualifications = value.skillSet;
      }
    });
    
  }
}
