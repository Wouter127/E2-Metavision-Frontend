import { TestBed } from '@angular/core/testing';

import { AuthOrganisatiebeheerderGuard } from './auth-organisatiebeheerder.guard';

describe('AuthOrganisatiebeheerderGuard', () => {
  let guard: AuthOrganisatiebeheerderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOrganisatiebeheerderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
