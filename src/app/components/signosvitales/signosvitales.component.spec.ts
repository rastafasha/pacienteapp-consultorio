import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignosvitalesComponent } from './signosvitales.component';

describe('SignosvitalesComponent', () => {
  let component: SignosvitalesComponent;
  let fixture: ComponentFixture<SignosvitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignosvitalesComponent ]
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
