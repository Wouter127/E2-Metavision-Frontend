import { TestBed } from '@angular/core/testing';

import { WeerstationService } from './weerstation.service';

describe('WeerstationService', () => {
  let service: WeerstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeerstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
