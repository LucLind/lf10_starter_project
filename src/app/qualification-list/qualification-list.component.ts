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
  dialogClass: string = "confirm-delete-dialog";
  dialogClassN: string = "confirm-delete-dialog";
  dialogClassAddQuali: string = "confirm-delete-dialog";

  confirmDeleteDialog: HTMLDialogElement | null = null;
  confirmAddDialog: HTMLDialogElement | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.qualifications$ = of([]);
    this.fetchData();
    this.qualification = new Qualification();
  }
  public qualification: Qualification;

  ngOnInit(): void {
    this.confirmDeleteDialog = document.getElementById("confirmDeleteDialog") as HTMLDialogElement;
    this.confirmAddDialog = document.getElementById("confirmAddDialog") as HTMLDialogElement;
  }

  public fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  OnDelete(quali: Qualification) {
    this.qualificationToDelete = quali;
    this.confirmDeleteDialog?.showModal();
  }
  OnDeleteConfirm() {
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
      complete() {
        that.fetchData();
        that.dialogClassN = "delete-success";
        that.confirmDeleteDialog?.close();
      }
    });
  }
  OnDeleteCancel() {
    this.confirmDeleteDialog?.close();
  }

  OnAddQuali() {
    this.confirmAddDialog?.showModal();
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
        that.fetchData();
        that.confirmAddDialog?.close();
      },
    })
  }
  OnSaveCancel() {
    this.confirmAddDialog?.close();
  }

}
