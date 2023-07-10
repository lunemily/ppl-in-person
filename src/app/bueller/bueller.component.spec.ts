import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuellerComponent } from './bueller.component';

describe('BuellerComponent', () => {
  let component: BuellerComponent;
  let fixture: ComponentFixture<BuellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuellerComponent]
    });
    fixture = TestBed.createComponent(BuellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
