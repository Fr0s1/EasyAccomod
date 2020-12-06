import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyReportComponent } from './verify-report.component';

describe('VerifyReportComponent', () => {
  let component: VerifyReportComponent;
  let fixture: ComponentFixture<VerifyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
