import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikersListComponent } from './gebruikers-list.component';

describe('GebruikersListComponent', () => {
  let component: GebruikersListComponent;
  let fixture: ComponentFixture<GebruikersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
