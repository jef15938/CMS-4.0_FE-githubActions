import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmSharedComponent } from './farm-shared.component';

describe('FarmSharedComponent', () => {
  let component: FarmSharedComponent;
  let fixture: ComponentFixture<FarmSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FarmSharedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
