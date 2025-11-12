import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rendimiento } from './rendimiento';

describe('Rendimiento', () => {
  let component: Rendimiento;
  let fixture: ComponentFixture<Rendimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rendimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rendimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
