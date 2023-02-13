import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeQualificationEntry } from '../Qualification';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
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
      "lastName": this.employee.lastName,
      "firstName": this.employee.firstName,
      "street": this.employee.street,
      "postcode": this.employee.postcode,
      "city": this.employee.city,
      "phone": this.employee.phone
    }

    console.log(body)

    this.http.post<any>('/employeeService', body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      },
      next: data => {
        window.location.href = `/employees/${data.id}`;
      }
    })
  }

  public employee: Employee
  public employeeQualifications: EmployeeQualificationEntry[] = [];

  constructor(private http: HttpClient) {
    this.employee = new Employee();
  }

  public formValid() {
    return this.employee.firstName != null && this.employee.firstName.length > 0
      && this.employee.lastName != null && this.employee.lastName.length > 0
      && this.employee.street != null && this.employee.street.length > 0
      && this.employee.postcode != null && this.employee.postcode.length > 0
      && this.employee.city != null && this.employee.city.length > 0
      && this.employee.phone != null && this.employee.phone.length > 0;
  }
  public postalCodeValid() {
    return this.employee.postcode != null && this.employee.postcode.length == 5;
  }

}
