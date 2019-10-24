import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VConfirmComponent } from './v-confirm.component';

describe('VConfirmComponent', () => {
  let component: VConfirmComponent;
  let fixture: ComponentFixture<VConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
