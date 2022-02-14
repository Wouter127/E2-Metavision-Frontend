import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationDashboardLichtComponent } from './weerstation-dashboard-licht.component';

describe('WeerstationDashboardLichtComponent', () => {
  let component: WeerstationDashboardLichtComponent;
  let fixture: ComponentFixture<WeerstationDashboardLichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationDashboardLichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationDashboardLichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
