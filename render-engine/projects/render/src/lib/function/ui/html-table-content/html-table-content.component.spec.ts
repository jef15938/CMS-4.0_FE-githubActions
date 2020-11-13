import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTableContentComponent } from './html-table-content.component';

describe('HtmlTableContentComponent', () => {
  let component: HtmlTableContentComponent;
  let fixture: ComponentFixture<HtmlTableContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlTableContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
