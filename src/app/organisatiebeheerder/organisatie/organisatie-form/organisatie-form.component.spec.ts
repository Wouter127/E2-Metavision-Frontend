import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatieFormComponent } from './organisatie-form.component';

describe('OrganisatieFormComponent', () => {
  let component: OrganisatieFormComponent;
  let fixture: ComponentFixture<OrganisatieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
