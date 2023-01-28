import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  OnSave() {
    let token = '' + localStorage.getItem('auth_token');

    var body = {
      "lastName": this.employee.lastName,
      "firstName": this.employee.firstName,
      "street": this.employee.street,
      "postcode": this.employee.postcode,
      "city": this.employee.city,
      "phone": this.employee.phone
    }

    console.log(body)

    this.http.post<any>('/employeeService', body,  {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
    }).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  public employee: Employee

  constructor(private http: HttpClient){
    this.employee = new Employee();
  }
}
