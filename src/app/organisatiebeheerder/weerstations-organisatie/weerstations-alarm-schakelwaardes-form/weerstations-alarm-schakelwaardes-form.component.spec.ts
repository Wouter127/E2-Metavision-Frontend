import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsAlarmSchakelwaardesFormComponent } from './weerstations-alarm-schakelwaardes-form.component';

describe('WeerstationsAlarmSchakelwaardesFormComponent', () => {
  let component: WeerstationsAlarmSchakelwaardesFormComponent;
  let fixture: ComponentFixture<WeerstationsAlarmSchakelwaardesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsAlarmSchakelwaardesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsAlarmSchakelwaardesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
