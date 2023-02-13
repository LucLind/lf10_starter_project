import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapTo, Observable, of, take } from 'rxjs';
import { Employee } from '../Employee';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
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
    if (!this.formValid()) {
      alert("Alle Felder müssen ausgefüllt werden");
      return;
    }
    if (!this.postalCodeValid()) {
      alert("Postleitzahl muss 5-stellig sein");
      return;
    }

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
        window.location.href = "/employeeservice";
      }
    });
  }

  OnCancel() {
    window.location.reload();
  }

  OnEdit() {
    this.disableEdit = false;
  }

  public formValid() {
    return this.emp.firstName != null && this.emp.firstName.length > 0
      && this.emp.lastName != null && this.emp.lastName.length > 0
      && this.emp.street != null && this.emp.street.length > 0
      && this.emp.postcode != null && this.emp.postcode.length > 0
      && this.emp.city != null && this.emp.city.length > 0
      && this.emp.phone != null && this.emp.phone.length > 0;
  }
  public postalCodeValid() {
    return this.emp.postcode != null && this.emp.postcode.length == 5;
  }
}
