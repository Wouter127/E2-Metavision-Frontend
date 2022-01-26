import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersOrganisatieListComponent } from './gebruikers-organisatie-list.component';

describe('GebruikersOrganisatieListComponent', () => {
  let component: GebruikersOrganisatieListComponent;
  let fixture: ComponentFixture<GebruikersOrganisatieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersOrganisatieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersOrganisatieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
