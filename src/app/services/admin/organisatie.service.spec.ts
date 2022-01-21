import { TestBed } from '@angular/core/testing';

import { OrganisatieService } from './organisatie.service';

describe('OrganisatieService', () => {
  let service: OrganisatieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisatieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
