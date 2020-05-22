import { Component, OnInit } from '@angular/core';
import { ContentInfo } from '@layout';
import { RenderService } from '../../render.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'lib-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  contentInfo: ContentInfo;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _renderService: RenderService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      concatMap(params =>
        this._renderService.getContentInfo(params['contentId']).pipe(
          tap(contentInfo => this.contentInfo = contentInfo),
        )
      )
    ).subscribe();
  }

}
