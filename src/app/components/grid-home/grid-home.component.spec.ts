import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { GridHomeComponent } from './grid-home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('GridHomeComponent', () => {
  let component: GridHomeComponent;
  let fixture: ComponentFixture<GridHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridHomeComponent ],
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

    fixture = TestBed.createComponent(GridHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
