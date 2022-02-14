import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VraagFormComponent } from './vraag-form.component';

describe('VraagFormComponent', () => {
  let component: VraagFormComponent;
  let fixture: ComponentFixture<VraagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VraagFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VraagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
