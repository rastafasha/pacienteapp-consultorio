import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { PublicidadComponent } from './publicidad.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('PublicidadComponent', () => {
  let component: PublicidadComponent;
  let fixture: ComponentFixture<PublicidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicidadComponent ],
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

    fixture = TestBed.createComponent(PublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

