import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlMegaMenuComponent } from './mega-menu.component';

describe('MegaMenuComponent', () => {
  let component: TlMegaMenuComponent;
  let fixture: ComponentFixture<TlMegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TlMegaMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
