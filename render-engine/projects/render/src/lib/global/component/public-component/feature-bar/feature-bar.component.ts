import { Component, OnInit, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-feature-bar',
  templateUrl: './feature-bar.component.html',
  styleUrls: ['./feature-bar.component.scss']
})
export class FeatureBarComponent extends CustomizeBaseDirective implements OnInit {

  featureList: Array<string> = ['專業獎項', '公平待客', '網站聲明'];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
