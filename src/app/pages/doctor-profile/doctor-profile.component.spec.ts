import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { DoctorProfileComponent } from './doctor-profile.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('DoctorProfileComponent', () => {
  let component: DoctorProfileComponent;
  let fixture: ComponentFixture<DoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorProfileComponent ],
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

    fixture = TestBed.createComponent(DoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
