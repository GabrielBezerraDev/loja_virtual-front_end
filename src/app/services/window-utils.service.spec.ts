import { TestBed } from '@angular/core/testing';

import { WindowUtilsService } from './window-utils.service';

describe('WindowUtilsService', () => {
  let service: WindowUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
