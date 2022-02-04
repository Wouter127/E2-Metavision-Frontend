import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwWachtwoordComponent } from './nieuw-wachtwoord.component';

describe('NieuwWachtwoordComponent', () => {
  let component: NieuwWachtwoordComponent;
  let fixture: ComponentFixture<NieuwWachtwoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieuwWachtwoordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuwWachtwoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
