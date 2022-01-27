import { TestBed } from '@angular/core/testing';

import { OrganisatiebeheerderAuthGuard } from './organisatiebeheerder-auth.guard';

describe('OrganisatiebeheerderAuthGuard', () => {
  let guard: OrganisatiebeheerderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrganisatiebeheerderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
