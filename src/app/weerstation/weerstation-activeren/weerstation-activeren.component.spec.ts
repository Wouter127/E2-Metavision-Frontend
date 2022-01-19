import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationActiverenComponent } from './weerstation-activeren.component';

describe('WeerstationActiverenComponent', () => {
  let component: WeerstationActiverenComponent;
  let fixture: ComponentFixture<WeerstationActiverenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationActiverenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationActiverenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
