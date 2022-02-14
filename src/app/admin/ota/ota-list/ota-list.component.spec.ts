import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaListComponent } from './ota-list.component';

describe('OtaListComponent', () => {
  let component: OtaListComponent;
  let fixture: ComponentFixture<OtaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
