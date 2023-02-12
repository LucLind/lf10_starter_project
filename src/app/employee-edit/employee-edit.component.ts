import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapTo, Observable, of, take } from 'rxjs';
import { Employee } from '../Employee';
import { EmployeeQualificationEntry } from '../Qualification';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employee: Observable<Employee>;
  @Output()
  emp: Employee;
  @Output()
  employeeQualifications: EmployeeQualificationEntry[];
  id;
  disableEdit: boolean = true;
  dialogElement: HTMLDialogElement | null = null;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.employee = of();
    this.emp = new Employee();
    this.employeeQualifications = [];
    this.fetchData();
  }

  ngOnInit(): void {
    this.dialogElement = document.getElementById("confirmDeleteDialog") as HTMLDialogElement;
  }

  fetchData() {
    this.employee = this.http.get<Employee>(`/employeeService/${this.id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
    this.employee.subscribe(e => this.emp = e);

    this.http.get<any>(`/employeeService/${this.id}/qualifications`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(data => {
      this.employeeQualifications = data.skillSet.map((skill: any) => {
        return new EmployeeQualificationEntry(skill.designation, false, false);
      });
    });
  }

  OnSave() {
    var body = {
      "lastName": this.emp.lastName,
      "firstName": this.emp.firstName,
      "street": this.emp.street,
      "postcode": this.emp.postcode,
      "city": this.emp.city,
      "phone": this.emp.phone
    }

    this.http.put<any>(`/employeeService/${this.id}`, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })

    var newQualifications = this.employeeQualifications.filter(q => q.newlyAdded && !q.removeFlag);
    var deletedQualifications = this.employeeQualifications.filter(q => q.removeFlag);

    newQualifications.forEach(q => {
      this.http.post<any>(`/employeeService/${this.id}/qualifications`, q, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }).subscribe({
        error: error => {
          console.error('There was an error!', error);
        }
      });
    });

    deletedQualifications.forEach(q => {
      this.http.delete<any>(`/employeeService/${this.id}/qualifications`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
        body: q
      }).subscribe({
        error: error => {
          console.error('There was an error!', error);
        },
        complete: () => {
          this.employeeQualifications = this.employeeQualifications.filter(q => !q.removeFlag);
        }
      });
    });
    this.disableEdit = true;
  }

  OnDelete() {
    this.dialogElement?.showModal();
  }
  OnDeleteCancel() {
    this.dialogElement?.close();
  }
  OnDeleteConfirm() {
    this.http.delete<any>(`/employeeService/${this.id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        window.location.href = "/employees";
      }
    });
  }

  OnCancel() {
    window.location.reload();
  }

  OnEdit() {
    this.disableEdit = false;
  }
}
