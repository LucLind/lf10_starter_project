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

    this.updateQualificationOptions();
  }

  public addQualification() {
    if (this.selectedQualification.designation == null) {
      return;
    }
    var newQualification = new EmployeeQualificationEntry(this.selectedQualification.designation, true, false);
    this.employeeQualifications.push(newQualification);
    this.updateQualificationOptions();
  }
  public selected(event: any) {
    this.selectedQualification = new Qualification();
    this.selectedQualification.designation = event.target.value;
  }


  private updateQualificationOptions() {
    // remove qualification options that are inside employeeQualifications
    this.qualificationOptions.subscribe((qualifications: Qualification[]) => {
      qualifications.forEach((qualification: Qualification) => {
        this.employeeQualifications.forEach((employeeQualification: EmployeeQualificationEntry) => {
          if (employeeQualification.designation === qualification.designation) {
            qualifications.splice(qualifications.indexOf(qualification), 1);
          }
        });
      });
      this.qualificationOptions = of(qualifications);
    });
  }
}


