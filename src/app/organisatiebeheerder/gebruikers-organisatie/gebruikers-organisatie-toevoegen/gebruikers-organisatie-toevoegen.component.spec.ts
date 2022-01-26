import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersOrganisatieToevoegenComponent } from './gebruikers-organisatie-toevoegen.component';

describe('GebruikersOrganisatieToevoegenComponent', () => {
  let component: GebruikersOrganisatieToevoegenComponent;
  let fixture: ComponentFixture<GebruikersOrganisatieToevoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersOrganisatieToevoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersOrganisatieToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
