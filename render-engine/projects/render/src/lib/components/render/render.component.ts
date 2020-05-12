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

  onMouseEnter(ev){
    // console.warn('onMouseenter() ev = ', ev);
  }

  onMouseLeave(ev){
    // console.warn('onMouseLeave() ev = ', ev);
  }

  onSelect(ev){
    // console.warn('onSelect() ev = ', ev);
  }


}
