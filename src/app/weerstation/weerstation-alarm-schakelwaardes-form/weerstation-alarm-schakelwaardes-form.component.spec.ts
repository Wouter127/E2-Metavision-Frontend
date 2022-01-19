import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form.component';

describe('WeerstationAlarmSchakelwaardesFormComponent', () => {
  let component: WeerstationAlarmSchakelwaardesFormComponent;
  let fixture: ComponentFixture<WeerstationAlarmSchakelwaardesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationAlarmSchakelwaardesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationAlarmSchakelwaardesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
