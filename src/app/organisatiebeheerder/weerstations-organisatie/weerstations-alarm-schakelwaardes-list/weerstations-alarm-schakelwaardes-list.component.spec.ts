import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsAlarmSchakelwaardesListComponent } from './weerstations-alarm-schakelwaardes-list.component';

describe('WeerstationsAlarmSchakelwaardesListComponent', () => {
  let component: WeerstationsAlarmSchakelwaardesListComponent;
  let fixture: ComponentFixture<WeerstationsAlarmSchakelwaardesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsAlarmSchakelwaardesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsAlarmSchakelwaardesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
