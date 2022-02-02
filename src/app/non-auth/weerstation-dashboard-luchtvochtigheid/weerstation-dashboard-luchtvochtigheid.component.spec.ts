import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationDashboardLuchtvochtigheidComponent } from './weerstation-dashboard-luchtvochtigheid.component';

describe('WeerstationDashboardLuchtvochtigheidComponent', () => {
  let component: WeerstationDashboardLuchtvochtigheidComponent;
  let fixture: ComponentFixture<WeerstationDashboardLuchtvochtigheidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationDashboardLuchtvochtigheidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationDashboardLuchtvochtigheidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
