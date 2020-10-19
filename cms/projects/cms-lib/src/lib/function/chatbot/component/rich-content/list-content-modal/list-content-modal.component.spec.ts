import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentModalComponent } from './list-content-modal.component';

describe('ListContentModalComponent', () => {
  let component: ListContentModalComponent;
  let fixture: ComponentFixture<ListContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
