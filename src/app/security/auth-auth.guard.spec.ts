import { TestBed } from '@angular/core/testing';

import { AuthAuthGuard } from './auth-auth.guard';

describe('AuthAuthGuard', () => {
  let guard: AuthAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
