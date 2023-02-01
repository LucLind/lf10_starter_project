import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  OnDelete(quali:Qualification){
    console.log(quali);
    this.http.delete<any>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      body: quali
    }).subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
    });
  }
}
