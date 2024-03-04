import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengerQueueListComponent } from './challenger-queue-list.component';

describe('ChallengerQueueListComponent', () => {
  let component: ChallengerQueueListComponent;
  let fixture: ComponentFixture<ChallengerQueueListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengerQueueListComponent]
    });
    fixture = TestBed.createComponent(ChallengerQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
