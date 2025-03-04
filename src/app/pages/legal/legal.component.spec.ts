import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalComponent } from './legal.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('LegalComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalComponent ],
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

    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
