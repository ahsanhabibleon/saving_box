import { TestBed } from '@angular/core/testing';

import { GetMyIpService } from './get-my-ip.service';

describe('GetMyIpService', () => {
  let service: GetMyIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMyIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
