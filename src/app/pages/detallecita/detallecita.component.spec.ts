import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecitaComponent } from './detallecita.component';

describe('DetallecitaComponent', () => {
  let component: DetallecitaComponent;
  let fixture: ComponentFixture<DetallecitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallecitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallecitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
