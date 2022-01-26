import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationListComponent } from './weerstation-list.component';

describe('WeerstationListComponent', () => {
  let component: WeerstationListComponent;
  let fixture: ComponentFixture<WeerstationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
