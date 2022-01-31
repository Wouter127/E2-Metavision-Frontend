import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervolledigGebruikerComponent } from './vervolledig-gebruiker.component';

describe('VervolledigGebruikerComponent', () => {
  let component: VervolledigGebruikerComponent;
  let fixture: ComponentFixture<VervolledigGebruikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VervolledigGebruikerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VervolledigGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
