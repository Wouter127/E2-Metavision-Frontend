import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationFormComponent } from './weerstation-form.component';

describe('WeerstationFormComponent', () => {
  let component: WeerstationFormComponent;
  let fixture: ComponentFixture<WeerstationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
