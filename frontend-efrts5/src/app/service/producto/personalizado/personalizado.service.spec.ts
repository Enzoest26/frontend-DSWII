import { TestBed } from '@angular/core/testing';

import { PersonalizadoService } from './personalizado.service';

describe('PersonalizadoService', () => {
  let service: PersonalizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
