import { Component, OnInit } from '@angular/core';
import { ContentInfo } from '@layout';
import { RenderService } from '../../render.service';

@Component({
  selector: 'lib-render',
  template: `
    <p>
      render works!
    </p>
    <layout-wrapper *ngFor="let info of contentInfo.templateList" [templateInfo]="info"></layout-wrapper>
  `,
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


}
