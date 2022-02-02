import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationDashboardTemperatuurComponent } from './weerstation-dashboard-temperatuur.component';

describe('WeerstationDashboardTemperatuurComponent', () => {
  let component: WeerstationDashboardTemperatuurComponent;
  let fixture: ComponentFixture<WeerstationDashboardTemperatuurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationDashboardTemperatuurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationDashboardTemperatuurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
