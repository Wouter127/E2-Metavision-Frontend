import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationDashboardComponent } from './weerstation-dashboard.component';

describe('WeerstationDashboardComponent', () => {
  let component: WeerstationDashboardComponent;
  let fixture: ComponentFixture<WeerstationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
