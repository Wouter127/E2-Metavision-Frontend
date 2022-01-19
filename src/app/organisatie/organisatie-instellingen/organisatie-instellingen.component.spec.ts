import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatieInstellingenComponent } from './organisatie-instellingen.component';

describe('OrganisatieInstellingenComponent', () => {
  let component: OrganisatieInstellingenComponent;
  let fixture: ComponentFixture<OrganisatieInstellingenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatieInstellingenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatieInstellingenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
