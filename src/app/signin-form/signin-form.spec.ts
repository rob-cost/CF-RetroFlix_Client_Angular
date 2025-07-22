import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninForm } from './signin-form';

describe('SigninForm', () => {
  let component: SigninForm;
  let fixture: ComponentFixture<SigninForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
