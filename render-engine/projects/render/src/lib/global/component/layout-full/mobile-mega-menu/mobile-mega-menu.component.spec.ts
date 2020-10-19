import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMegaMenuComponent } from './mobile-mega-menu.component';

describe('MobileMegaMenuComponent', () => {
  let component: MobileMegaMenuComponent;
  let fixture: ComponentFixture<MobileMegaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMegaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
