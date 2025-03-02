import { getTestBed, TestBed } from '@angular/core/testing';

import { PresupuestoService } from './presupuesto.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('PresupuestoService', () => {
  let service: PresupuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
         imports: [HttpClientModule],
              providers: [PresupuestoService, AuthService]
    });
    service = TestBed.inject(PresupuestoService);
  });

    it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
