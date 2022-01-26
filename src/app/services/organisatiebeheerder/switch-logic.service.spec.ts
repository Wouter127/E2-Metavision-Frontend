import { TestBed } from '@angular/core/testing';

import { SwitchLogicService } from './switch-logic.service';

describe('SwitchLogicService', () => {
  let service: SwitchLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
