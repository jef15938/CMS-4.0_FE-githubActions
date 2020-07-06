import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTempComponent } from './news-temp.component';

describe('NewsTempComponent', () => {
  let component: NewsTempComponent;
  let fixture: ComponentFixture<NewsTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
