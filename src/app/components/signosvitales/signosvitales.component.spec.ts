import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { SignosvitalesComponent } from './signosvitales.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('SignosvitalesComponent', () => {
  let component: SignosvitalesComponent;
  let fixture: ComponentFixture<SignosvitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignosvitalesComponent ],
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

    fixture = TestBed.createComponent(SignosvitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
