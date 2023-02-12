import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent {
  @Input()
  qualifications$: Qualification[] = [];

  @Output() qualificationChange: EventEmitter<any> = new EventEmitter<any>();

  qualificationToDelete: Qualification = new Qualification();
  dialogClass: string = "confirm-delete-dialog";
  dialogClassN: string = "confirm-delete-dialog";
  dialogClassAddQuali: string = "confirm-delete-dialog";

  confirmDeleteDialog: HTMLDialogElement | null = null;
  confirmAddDialog: HTMLDialogElement | null = null;

  searchTerm: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.qualification = new Qualification();
  }
  public qualification: Qualification;

  ngOnInit(): void {
    this.confirmDeleteDialog = document.getElementById("confirmDeleteDialog") as HTMLDialogElement;
    this.confirmAddDialog = document.getElementById("confirmAddDialog") as HTMLDialogElement;
  }

  public fetchData() {
    this.http.get<any>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(list => {
      this.qualifications$ = list;
      this.qualificationChange.emit(this.qualifications$);
    });
  }

  OnDelete(quali: Qualification) {
    this.qualificationToDelete = quali;
    this.confirmDeleteDialog?.showModal();
  }
  OnDeleteConfirm() {
    let that = this;



    this.http.delete<any>('/qualificationsService', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      body: this.qualificationToDelete
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
        this.DeleteQualificationFromAllEmployees(this.qualificationToDelete);
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

  DeleteQualificationFromAllEmployees(quali: Qualification) {
    // Get all employees with the qualification
    this.http.get<any>(`/qualificationsService/${quali.designation}/employees`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(list => {
      let employeeList = list.employees;

      // Loop through all employees
      for (let i = 0; i < employeeList.length; i++) {
        let employee = employeeList[i];
        this.RemoveQualificationFromEmployee(quali, employee.id);
      }
      this.OnDeleteConfirm();
    });

  }

  RemoveQualificationFromEmployee(quali: Qualification, employeeId: number) {
    let that = this;

    this.http.delete<any>(`/employeeService/${employeeId}/qualifications`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      body: quali
    }).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  OnAddQuali() {
    this.confirmAddDialog?.showModal();
  }
  OnSaveConfirm() {
    let that = this;

    // Check if the qualification already exists
    for (let i = 0; i < this.qualifications$.length; i++) {
      if (this.qualifications$[i].designation === this.qualification.designation) {
        alert("Qualification already exists");
        return;
      }
    }

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

  onSearchTermEntered(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
  search(q: Qualification) {
    if (this.searchTerm === '' ||
      q.designation?.toLowerCase().includes(this.searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  }
}
