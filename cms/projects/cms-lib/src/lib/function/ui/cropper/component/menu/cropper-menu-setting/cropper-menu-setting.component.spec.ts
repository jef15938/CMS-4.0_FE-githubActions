import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperMenuSettingComponent } from './cropper-menu-setting.component';

describe('CropperMenuSettingComponent', () => {
  let component: CropperMenuSettingComponent;
  let fixture: ComponentFixture<CropperMenuSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperMenuSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperMenuSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
