import { TestBed } from '@angular/core/testing';

import { ResourceItemService } from './resource-item.service';

describe('ResourceItemService', () => {
  let service: ResourceItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
