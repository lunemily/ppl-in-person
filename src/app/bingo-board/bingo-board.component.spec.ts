import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoBoardComponent } from './bingo-board.component';

describe('BingoBoardComponent', () => {
  let component: BingoBoardComponent;
  let fixture: ComponentFixture<BingoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
