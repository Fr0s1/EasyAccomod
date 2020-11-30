import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCommentsComponent } from './verify-comments.component';

describe('VerifyCommentsComponent', () => {
  let component: VerifyCommentsComponent;
  let fixture: ComponentFixture<VerifyCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
