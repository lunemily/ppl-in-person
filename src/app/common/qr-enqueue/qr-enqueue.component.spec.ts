import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrEnqueueComponent } from './qr-enqueue.component';

describe('QrEnqueueComponent', () => {
  let component: QrEnqueueComponent;
  let fixture: ComponentFixture<QrEnqueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [QrEnqueueComponent]
});
    fixture = TestBed.createComponent(QrEnqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
