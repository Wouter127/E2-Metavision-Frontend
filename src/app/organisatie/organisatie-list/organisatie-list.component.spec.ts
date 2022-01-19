import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatieListComponent } from './organisatie-list.component';

describe('OrganisatieListComponent', () => {
  let component: OrganisatieListComponent;
  let fixture: ComponentFixture<OrganisatieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
