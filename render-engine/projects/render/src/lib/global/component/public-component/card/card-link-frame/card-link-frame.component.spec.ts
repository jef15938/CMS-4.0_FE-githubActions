import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLinkFrameComponent } from './card-link-frame.component';

describe('CardLinkFrameComponent', () => {
  let component: CardLinkFrameComponent;
  let fixture: ComponentFixture<CardLinkFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLinkFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLinkFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
