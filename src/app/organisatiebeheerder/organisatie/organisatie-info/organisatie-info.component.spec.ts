import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatieInfoComponent } from './organisatie-info.component';

describe('OrganisatieInfoComponent', () => {
  let component: OrganisatieInfoComponent;
  let fixture: ComponentFixture<OrganisatieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatieInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
