import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomateBlogComponent } from './roomate-blog.component';

describe('RoomateBlogComponent', () => {
  let component: RoomateBlogComponent;
  let fixture: ComponentFixture<RoomateBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomateBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
