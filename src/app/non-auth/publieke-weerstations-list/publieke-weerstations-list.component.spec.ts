import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliekeWeerstationsListComponent } from './publieke-weerstations-list.component';

describe('PubliekeWeerstationsListComponent', () => {
  let component: PubliekeWeerstationsListComponent;
  let fixture: ComponentFixture<PubliekeWeerstationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubliekeWeerstationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliekeWeerstationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
