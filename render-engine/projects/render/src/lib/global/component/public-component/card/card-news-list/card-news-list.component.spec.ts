import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewsListComponent } from './card-news-list.component';

describe('CardNewsListComponent', () => {
  let component: CardNewsListComponent;
  let fixture: ComponentFixture<CardNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNewsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
