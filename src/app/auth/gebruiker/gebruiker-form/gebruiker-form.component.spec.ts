import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerFormComponent } from './gebruiker-form.component';

describe('GebruikerFormComponent', () => {
  let component: GebruikerFormComponent;
  let fixture: ComponentFixture<GebruikerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
