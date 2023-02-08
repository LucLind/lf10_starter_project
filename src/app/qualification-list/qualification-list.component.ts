import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;
  qualificationToDelete: Qualification = new Qualification();
  dialogClass :string = "confirm-delete-dialog";
  dialogClassN :string = "confirm-delete-dialog";
  dialogClassAddQuali : string = "confirm-delete-dialog";

  constructor(private http: HttpClient, private router: Router) {
    this.qualifications$ = of([]);
    this.fetchData();
    this.qualification = new Qualification();
  }
  public qualification : Qualification;

  public fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  OnDelete(quali:Qualification){
    this.qualificationToDelete = quali;
    this.dialogClass = "dialog-visible"

    //window.location.reload(
  }
  OnDeleteConfirm(){
    let that = this;
    console.log(this.qualificationToDelete);
    this.http.delete<any>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      body: this.qualificationToDelete
    }).subscribe({
      error: error => {
          console.error('There was an error!', error);
      },
      complete(){
        that.fetchData();
        that.dialogClassN = "delete-success";
        that.dialogClass = "confirm-delete-dialog";
      }
    });
  }
  OnDeleteCancel(){
    this.dialogClass = "confirm-delete-dialog";
  }

  OnAddQuali(){
    this.dialogClassAddQuali = "dialog-visible";
  }
  OnSaveConfirm() {
    let that = this;
    this.http.post<any>('/qualificationsService', `{"designation": "${this.qualification.designation}"}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      },
      complete() {
        that.router.navigateByUrl('/qualifications');
        that.fetchData();
        that.dialogClassAddQuali= "confirm-delete-dialog";
      },
    })
  }
  OnSaveCancel(){
    this.dialogClassAddQuali = "confirm-delete-dialog";
  }

}
