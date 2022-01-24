import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmwaardesListComponent } from './alarmwaardes-list.component';

describe('AlarmwaardesListComponent', () => {
  let component: AlarmwaardesListComponent;
  let fixture: ComponentFixture<AlarmwaardesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmwaardesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmwaardesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
