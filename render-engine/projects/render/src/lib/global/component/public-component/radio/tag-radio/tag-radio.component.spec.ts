import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRadioComponent } from './tag-radio.component';

describe('TagRadioComponent', () => {
  let component: TagRadioComponent;
  let fixture: ComponentFixture<TagRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
