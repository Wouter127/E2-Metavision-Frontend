import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatieToevoegenComponent } from './organisatie-toevoegen.component';

describe('OrganisatieToevoegenComponent', () => {
  let component: OrganisatieToevoegenComponent;
  let fixture: ComponentFixture<OrganisatieToevoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatieToevoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatieToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
