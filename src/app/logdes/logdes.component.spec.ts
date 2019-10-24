import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdesComponent } from './logdes.component';

describe('LogdesComponent', () => {
  let component: LogdesComponent;
  let fixture: ComponentFixture<LogdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
