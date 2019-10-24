import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBlogComponent } from './property-blog.component';

describe('PropertyBlogComponent', () => {
  let component: PropertyBlogComponent;
  let fixture: ComponentFixture<PropertyBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
