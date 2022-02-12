import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationDashboardBatterijComponent } from './weerstation-dashboard-batterij.component';

describe('WeerstationDashboardBatterijComponent', () => {
  let component: WeerstationDashboardBatterijComponent;
  let fixture: ComponentFixture<WeerstationDashboardBatterijComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationDashboardBatterijComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationDashboardBatterijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
