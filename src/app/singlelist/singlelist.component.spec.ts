import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglelistComponent } from './singlelist.component';

describe('SinglelistComponent', () => {
  let component: SinglelistComponent;
  let fixture: ComponentFixture<SinglelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
