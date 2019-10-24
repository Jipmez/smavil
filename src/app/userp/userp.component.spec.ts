import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpComponent } from './userp.component';

describe('UserpComponent', () => {
  let component: UserpComponent;
  let fixture: ComponentFixture<UserpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
