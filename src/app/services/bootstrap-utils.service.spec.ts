import { TestBed } from '@angular/core/testing';

import { BootstrapUtilsService } from './bootstrap-utils.service';

describe('BootstrapUtilsService', () => {
  let service: BootstrapUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootstrapUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
