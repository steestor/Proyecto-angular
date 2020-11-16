import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordBoxComponent } from './password-box.component';

describe('PasswordBoxComponent', () => {
  let component: PasswordBoxComponent;
  let fixture: ComponentFixture<PasswordBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
