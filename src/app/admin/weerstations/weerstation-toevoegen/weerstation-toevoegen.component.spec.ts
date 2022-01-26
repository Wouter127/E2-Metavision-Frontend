import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationToevoegenComponent } from './weerstation-toevoegen.component';

describe('WeerstationToevoegenComponent', () => {
  let component: WeerstationToevoegenComponent;
  let fixture: ComponentFixture<WeerstationToevoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationToevoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
