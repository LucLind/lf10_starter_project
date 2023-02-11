import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeServicePageComponent } from './employee-service-page.component';

describe('EmployeeServicePageComponent', () => {
  let component: EmployeeServicePageComponent;
  let fixture: ComponentFixture<EmployeeServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeServicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
