import { TestBed, inject } from '@angular/core/testing';

import { DebatesService } from './debates.service';

describe('DebatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebatesService]
    });
  });

  it('should be created', inject([DebatesService], (service: DebatesService) => {
    expect(service).toBeTruthy();
  }));
});
