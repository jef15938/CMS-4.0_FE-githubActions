import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyActionCellComponent } from './reply-action-cell.component';

describe('ReplyActionCellComponent', () => {
  let component: ReplyActionCellComponent;
  let fixture: ComponentFixture<ReplyActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
