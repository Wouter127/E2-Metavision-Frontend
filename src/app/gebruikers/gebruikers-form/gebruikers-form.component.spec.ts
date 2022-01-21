import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersFormComponent } from './gebruikers-form.component';

describe('GebruikersFormComponent', () => {
  let component: GebruikersFormComponent;
  let fixture: ComponentFixture<GebruikersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
