import { TestBed } from '@angular/core/testing';

import { MaterialproductoService } from './materialproducto.service';

describe('MaterialproductoService', () => {
  let service: MaterialproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
