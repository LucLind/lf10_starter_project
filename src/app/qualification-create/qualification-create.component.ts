import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-create',
  templateUrl: './qualification-create.component.html',
  styleUrls: ['./qualification-create.component.css']
})
export class QualificationCreateComponent {


  OnSave() {
    let that = this;
    this.http.post<any>('/qualificationsService', `{"designation": "${this.qualification.designation}"}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      },
      complete() {
        that.router.navigateByUrl('/employeeservice');
      },
    })

  }
  public qualification: Qualification;

  constructor(private http: HttpClient, public router: Router) {
    this.qualification = new Qualification();
  }
}
