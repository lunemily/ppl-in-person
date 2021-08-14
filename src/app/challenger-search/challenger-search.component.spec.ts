import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengerSearchComponent } from './challenger-search.component';

describe('ChallengerSearchComponent', () => {
  let component: ChallengerSearchComponent;
  let fixture: ComponentFixture<ChallengerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
