import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFeildComponent } from './form-feild.component';

describe('FormFeildComponent', () => {
  let component: FormFeildComponent;
  let fixture: ComponentFixture<FormFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
