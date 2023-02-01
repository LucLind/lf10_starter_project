import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-create',
  templateUrl: './qualification-create.component.html',
  styleUrls: ['./qualification-create.component.css']
})
export class QualificationCreateComponent {

  
  OnSave() {
    this.http.post<any>('/qualificationsService', `{"designation": "${this.qualification.designation}"}`,  {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
    })

  }
  public qualification:Qualification;

  constructor(private http: HttpClient){
    this.qualification = new Qualification();
  }
}
