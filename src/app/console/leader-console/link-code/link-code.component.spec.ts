import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCodeComponent } from './link-code.component';

describe('LinkCodeComponent', () => {
  let component: LinkCodeComponent;
  let fixture: ComponentFixture<LinkCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkCodeComponent]
    });
    fixture = TestBed.createComponent(LinkCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
