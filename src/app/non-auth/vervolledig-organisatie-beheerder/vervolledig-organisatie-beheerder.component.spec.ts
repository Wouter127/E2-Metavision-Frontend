import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder.component';

describe('VervolledigOrganisatieBeheerderComponent', () => {
  let component: VervolledigOrganisatieBeheerderComponent;
  let fixture: ComponentFixture<VervolledigOrganisatieBeheerderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VervolledigOrganisatieBeheerderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VervolledigOrganisatieBeheerderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
