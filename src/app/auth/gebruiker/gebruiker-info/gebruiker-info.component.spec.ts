import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerInfoComponent } from './gebruiker-info.component';

describe('GebruikerInfoComponent', () => {
  let component: GebruikerInfoComponent;
  let fixture: ComponentFixture<GebruikerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
