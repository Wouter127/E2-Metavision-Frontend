import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsComponent } from './weerstations.component';

describe('WeerstationsComponent', () => {
  let component: WeerstationsComponent;
  let fixture: ComponentFixture<WeerstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
