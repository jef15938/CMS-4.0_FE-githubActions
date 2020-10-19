import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionCellComponent } from './item-action-cell.component';

describe('ItemActionCellComponent', () => {
  let component: ItemActionCellComponent;
  let fixture: ComponentFixture<ItemActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
