import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomhomeComponent } from './roomhome.component';

describe('RoomhomeComponent', () => {
  let component: RoomhomeComponent;
  let fixture: ComponentFixture<RoomhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
