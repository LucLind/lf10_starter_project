import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  @Input()
  public disableEdit: boolean = true;
  @Input()
  employee!: Employee;
  id;
  public qualificationOptions : Observable<Qualification[]> = of();
  public employeeQualifications : Qualification[] = [];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  ngOnInit(): void {
    this.qualificationOptions = this.http.get<Qualification[]>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
    
    this.http.get<any>(`/employeeService/${this.id}/qualifications`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(data => {
      this.employeeQualifications = data.skillSet;
    });
  }


}
