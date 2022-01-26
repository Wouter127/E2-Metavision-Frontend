import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersOrganisatieFormComponent } from './gebruikers-organisatie-form.component';

describe('GebruikersOrganisatieFormComponent', () => {
  let component: GebruikersOrganisatieFormComponent;
  let fixture: ComponentFixture<GebruikersOrganisatieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersOrganisatieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersOrganisatieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
