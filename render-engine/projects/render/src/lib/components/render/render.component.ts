import { Component, OnInit } from '@angular/core';
import { ContentInfo } from '@layout';
import { RenderService } from '../../render.service';

@Component({
  selector: 'lib-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  contentInfo: ContentInfo;

  constructor(
    private renderService: RenderService,
  ) { }

  ngOnInit(): void {
    this.contentInfo = this.renderService.getContentInfo('test');
  }

  onSelect(ev){
    console.warn('onSelect() ev = ', ev);
  }

  onEnter(ev){
    console.warn('onEnter() ev = ', ev);
  }

  onLeave(ev){
    console.warn('onLeave() ev = ', ev);
  }


}
