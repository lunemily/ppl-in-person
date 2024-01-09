import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueMgmtComponent } from './queue-mgmt.component';

describe('QueueMgmtComponent', () => {
  let component: QueueMgmtComponent;
  let fixture: ComponentFixture<QueueMgmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueMgmtComponent]
    });
    fixture = TestBed.createComponent(QueueMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
