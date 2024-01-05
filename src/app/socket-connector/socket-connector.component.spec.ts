import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketConnectorComponent } from './socket-connector.component';

describe('SocketConnectorComponent', () => {
  let component: SocketConnectorComponent;
  let fixture: ComponentFixture<SocketConnectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocketConnectorComponent]
    });
    fixture = TestBed.createComponent(SocketConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
