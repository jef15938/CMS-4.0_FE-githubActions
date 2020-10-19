import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScrollableComponent } from './tab-scrollable.component';

describe('TabScrollableComponent', () => {
  let component: TabScrollableComponent;
  let fixture: ComponentFixture<TabScrollableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScrollableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
