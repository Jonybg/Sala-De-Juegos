import { TestBed } from '@angular/core/testing';

import { SupabaseCliente } from './supabase-cliente';

describe('SupabaseCliente', () => {
  let service: SupabaseCliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseCliente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
