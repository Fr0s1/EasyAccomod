import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifyReportComponent } from './verify-report.component';

describe('VerifyReportComponent', () => {
  let component: VerifyReportComponent;
  let fixture: ComponentFixture<VerifyReportComponent>;

  beforeEach(waitForAsync(() => {
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
