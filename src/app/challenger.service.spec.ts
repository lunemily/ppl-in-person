import { TestBed } from '@angular/core/testing';

import { ChallengerService } from './challenger.service';

describe('ChallengerService', () => {
  let service: ChallengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
