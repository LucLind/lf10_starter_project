import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListEntryComponent } from './employee-list-entry.component';

describe('EmployeeListEntryComponent', () => {
  let component: EmployeeListEntryComponent;
  let fixture: ComponentFixture<EmployeeListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
