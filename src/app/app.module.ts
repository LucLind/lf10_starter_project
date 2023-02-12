import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { FormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { QualificationCreateComponent } from './qualification-create/qualification-create.component';
import { EmployeeListEntryComponent } from './employee-list-entry/employee-list-entry.component';
import { TokenInterceptor } from './token-interceptor';
import { SearchComponent } from './search/search.component';
import { EmployeeServicePageComponent } from './employee-service-page/employee-service-page.component';
import { QualificationEntryComponent } from './qualification-entry/qualification-entry.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.szut.dev/auth',
        realm: 'szut',
        clientId: 'employee-management-service-frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    QualificationListComponent,
    EmployeeDetailsComponent,
    NavigationHeaderComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent,
    HomeComponent,
    QualificationCreateComponent,
    EmployeeListEntryComponent,
    SearchComponent,
    EmployeeServicePageComponent,
    QualificationEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
