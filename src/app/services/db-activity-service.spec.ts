import { TestBed } from '@angular/core/testing';

import { DbActivityService } from './db-activity-service';

describe('DbActivityService', () => {
  let service: DbActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
