import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaPlannenComponent } from './ota-plannen.component';

describe('OtaPlannenComponent', () => {
  let component: OtaPlannenComponent;
  let fixture: ComponentFixture<OtaPlannenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaPlannenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaPlannenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
