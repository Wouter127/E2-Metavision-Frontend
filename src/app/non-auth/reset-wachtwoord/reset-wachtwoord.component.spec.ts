import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetWachtwoordComponent } from './reset-wachtwoord.component';

describe('ResetWachtwoordComponent', () => {
  let component: ResetWachtwoordComponent;
  let fixture: ComponentFixture<ResetWachtwoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetWachtwoordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetWachtwoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
