import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { PresupuestoDetalleComponent } from './presupuesto-detalle.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('PresupuestoDetalleComponent', () => {
  let component: PresupuestoDetalleComponent;
  let fixture: ComponentFixture<PresupuestoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestoDetalleComponent ],
      imports: [
                  HttpClientModule, // Add HttpClientModule to imports
              ],
              providers: [
                  {
                      provide: ActivatedRoute,
                      useValue: {
                          params: of({}), // Mock params observable
                          snapshot: { params: {} } // Mock snapshot
                      }
                  },
                  {
                      provide: SwUpdate,
                      useValue: {} // Mock SwUpdate
                  },
              ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

