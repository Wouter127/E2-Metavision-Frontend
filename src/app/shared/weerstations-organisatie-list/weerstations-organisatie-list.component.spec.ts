import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeerstationsOrganisatieListComponent } from './weerstations-organisatie-list.component';

describe('WeerstationsOrganisatieListComponent', () => {
  let component: WeerstationsOrganisatieListComponent;
  let fixture: ComponentFixture<WeerstationsOrganisatieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeerstationsOrganisatieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeerstationsOrganisatieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
