import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropComponent } from './admin-prop.component';

describe('AdminPropComponent', () => {
  let component: AdminPropComponent;
  let fixture: ComponentFixture<AdminPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
