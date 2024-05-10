import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHomeComponent } from './grid-home.component';

describe('GridHomeComponent', () => {
  let component: GridHomeComponent;
  let fixture: ComponentFixture<GridHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridHomeComponent ]
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
