import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaComponent } from './ayuda.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('AyudaComponent', () => {
  let component: AyudaComponent;
  let fixture: ComponentFixture<AyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyudaComponent ],
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

    fixture = TestBed.createComponent(AyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
