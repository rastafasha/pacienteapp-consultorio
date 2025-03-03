import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { CategoriasComponent } from './categorias.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasComponent ],
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

    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


