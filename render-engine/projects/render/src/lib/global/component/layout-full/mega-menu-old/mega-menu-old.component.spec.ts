import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuOldComponent } from './mega-menu-old.component';

describe('HeaderMenuComponent', () => {
  let component: MegaMenuOldComponent;
  let fixture: ComponentFixture<MegaMenuOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MegaMenuOldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
