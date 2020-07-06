import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { ContentInfo } from '../../interface';
import { RenderService } from '../../service/render.service';

@Component({
  selector: 'lib-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  contentInfo: ContentInfo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderService: RenderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      concatMap(params =>
        // tslint:disable-next-line: no-string-literal
        this.renderService.getContentInfo(params['contentId']).pipe(
          tap(contentInfo => this.contentInfo = contentInfo),
        )
      )
    ).subscribe();
  }

}
