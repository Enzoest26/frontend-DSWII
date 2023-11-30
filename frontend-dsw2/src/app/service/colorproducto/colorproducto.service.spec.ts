import { TestBed } from '@angular/core/testing';

import { ColorproductoService } from './colorproducto.service';

describe('ColorproductoService', () => {
  let service: ColorproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
