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
    var token = '' + localStorage.getItem('auth_token');
    this.qualifications$ = this.http.get<Qualification[]>('/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
    });
  }
}
