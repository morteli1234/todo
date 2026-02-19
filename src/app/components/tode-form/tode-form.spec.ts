import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodeForm } from './tode-form';

describe('TodeForm', () => {
  let component: TodeForm;
  let fixture: ComponentFixture<TodeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
