import { Injectable } from '@angular/core';
import { IconPageComponent, SliderComponent, TabDemoComponent } from 'layout';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentFactoryService {

  constructor() { }

  getComponent(id: string) {
    if (id === 'Tab') {
      return TabDemoComponent;
    }
    else if (id === 'IconPage') {
      return IconPageComponent;
    }
    else if (id === 'Slide') {
      return SliderComponent;
    }
  }
}
