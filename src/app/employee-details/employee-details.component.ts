import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';
import { EmployeeQualificationEntry, Qualification } from '../Qualification';

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
  @Input()
  employeeQualifications!: EmployeeQualificationEntry[];

  id;
  public qualificationOptions: Observable<Qualification[]> = of();

  selectedQualification: Qualification = new Qualification();

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.qualificationOptions = this.http.get<Qualification[]>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  public addQualification() {
    if (this.selectedQualification.designation == null) {
      return;
    }
    var newQualification = new EmployeeQualificationEntry(this.selectedQualification.designation, true, false);
    this.employeeQualifications.push(newQualification);
  }
  public selected(event: any) {
    this.selectedQualification = new Qualification();
    this.selectedQualification.designation = event.target.value;
  }
  public MarkDelete(event: any, quali: EmployeeQualificationEntry) {
    quali.removeFlag = !quali.removeFlag;
    if (quali.removeFlag) {
      event.target.parentElement.parentElement.classList.add('marked-delete');

    }
    else {
      event.target.parentElement.parentElement.classList.remove('marked-delete');
    }
  }

}


