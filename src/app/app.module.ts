import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    QualificationListComponent,
    EmployeeDetailsComponent,
    NavigationHeaderComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
