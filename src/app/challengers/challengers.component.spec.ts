import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengersComponent } from './challengers.component';

describe('ChallengersComponent', () => {
  let component: ChallengersComponent;
  let fixture: ComponentFixture<ChallengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
