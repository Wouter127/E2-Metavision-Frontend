import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsOrganisatieFormComponent } from './weerstations-organisatie-form.component';

describe('WeerstationsOrganisatieFormComponent', () => {
  let component: WeerstationsOrganisatieFormComponent;
  let fixture: ComponentFixture<WeerstationsOrganisatieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsOrganisatieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsOrganisatieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
