import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpicComponent } from './addpic.component';

describe('AddpicComponent', () => {
  let component: AddpicComponent;
  let fixture: ComponentFixture<AddpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
