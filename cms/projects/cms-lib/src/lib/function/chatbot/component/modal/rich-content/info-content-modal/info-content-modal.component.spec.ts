import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContentModalComponent } from './info-content-modal.component';

describe('InfoContentModalComponent', () => {
  let component: InfoContentModalComponent;
  let fixture: ComponentFixture<InfoContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
