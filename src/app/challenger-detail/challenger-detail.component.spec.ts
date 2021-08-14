import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengerDetailComponent } from './challenger-detail.component';

describe('ChallengerDetailComponent', () => {
  let component: ChallengerDetailComponent;
  let fixture: ComponentFixture<ChallengerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
