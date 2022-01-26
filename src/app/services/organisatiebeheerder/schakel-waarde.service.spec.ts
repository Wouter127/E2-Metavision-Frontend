import { TestBed } from '@angular/core/testing';

import { SchakelWaardeService } from './schakel-waarde.service';

describe('SchakelWaardeService', () => {
  let service: SchakelWaardeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchakelWaardeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
