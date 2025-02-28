import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoDetalleComponent } from './presupuesto-detalle.component';

describe('PresupuestoDetalleComponent', () => {
  let component: PresupuestoDetalleComponent;
  let fixture: ComponentFixture<PresupuestoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestoDetalleComponent ]
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
