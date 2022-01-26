import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersFormOrganisatiebeheerderComponent } from './gebruikers-form-organisatiebeheerder.component';

describe('GebruikersFormOrganisatiebeheerderComponent', () => {
  let component: GebruikersFormOrganisatiebeheerderComponent;
  let fixture: ComponentFixture<GebruikersFormOrganisatiebeheerderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersFormOrganisatiebeheerderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersFormOrganisatiebeheerderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
