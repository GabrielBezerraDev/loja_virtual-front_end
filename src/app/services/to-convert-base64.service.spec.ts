import { TestBed } from '@angular/core/testing';

import { ToConvertBase64Service } from './to-convert-base64.service';

describe('ToConvertBase64Service', () => {
  let service: ToConvertBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToConvertBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
