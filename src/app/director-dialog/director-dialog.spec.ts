import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDialog } from './director-dialog';

describe('DirectorDialog', () => {
  let component: DirectorDialog;
  let fixture: ComponentFixture<DirectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
