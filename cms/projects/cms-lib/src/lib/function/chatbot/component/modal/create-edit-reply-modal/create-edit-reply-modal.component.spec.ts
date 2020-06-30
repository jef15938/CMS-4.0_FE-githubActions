import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReplyModalComponent } from './create-edit-reply-modal.component';

describe('CreateEditReplyModalComponent', () => {
  let component: CreateEditReplyModalComponent;
  let fixture: ComponentFixture<CreateEditReplyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditReplyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditReplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
