import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsActiverenComponent } from './weerstations-activeren.component';

describe('WeerstationsActiverenComponent', () => {
  let component: WeerstationsActiverenComponent;
  let fixture: ComponentFixture<WeerstationsActiverenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsActiverenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsActiverenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
