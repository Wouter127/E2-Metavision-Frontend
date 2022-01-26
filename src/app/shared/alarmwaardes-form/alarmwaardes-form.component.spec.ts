import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmwaardesFormComponent } from './alarmwaardes-form.component';

describe('AlarmwaardesFormComponent', () => {
  let component: AlarmwaardesFormComponent;
  let fixture: ComponentFixture<AlarmwaardesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmwaardesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmwaardesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
