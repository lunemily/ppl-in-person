import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticImageComponent } from './static-image.component';

describe('StaticImageComponent', () => {
  let component: StaticImageComponent;
  let fixture: ComponentFixture<StaticImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaticImageComponent]
    });
    fixture = TestBed.createComponent(StaticImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
