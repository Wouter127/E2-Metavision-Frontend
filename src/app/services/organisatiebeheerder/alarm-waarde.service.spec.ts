import { TestBed } from '@angular/core/testing';

import { AlarmWaardeService } from './alarm-waarde.service';

describe('AlarmWaardeService', () => {
  let service: AlarmWaardeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmWaardeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
