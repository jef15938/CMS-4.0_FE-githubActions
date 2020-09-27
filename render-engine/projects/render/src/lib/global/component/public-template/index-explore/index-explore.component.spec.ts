import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexExploreComponent } from './index-explore.component';

describe('IndexExploreComponent', () => {
  let component: IndexExploreComponent;
  let fixture: ComponentFixture<IndexExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
