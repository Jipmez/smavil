import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmsgComponent } from './chatmsg.component';

describe('ChatmsgComponent', () => {
  let component: ChatmsgComponent;
  let fixture: ComponentFixture<ChatmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
