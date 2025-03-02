import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { PresupuestosComponent } from './presupuestos.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('PresupuestosComponent', () => {
  let component: PresupuestosComponent;
  let fixture: ComponentFixture<PresupuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosComponent ],
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

    fixture = TestBed.createComponent(PresupuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

