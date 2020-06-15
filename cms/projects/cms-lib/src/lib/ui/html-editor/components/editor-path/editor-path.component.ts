import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IHtmlEditorContext } from '../../html-editor.interface';

@Component({
  selector: 'cms-editor-path',
  templateUrl: './editor-path.component.html',
  styleUrls: ['./editor-path.component.scss']
})
export class EditorPathComponent implements OnInit, OnDestroy {

  @Input() context: IHtmlEditorContext;

  paths: HTMLElement[] = [];

  private destroy$ = new Subject();

  constructor() { }

  ngOnInit(): void {
    fromEvent(document, 'selectionchange').pipe(
      takeUntil(this.destroy$),
      debounceTime(200),
    ).subscribe(_ => {
      this.checkPath(this.context?.commonAncestorContainer as HTMLElement);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private checkPath(target: HTMLElement): void {

    const paths: HTMLElement[] = [];

    let el = target;
    while (el) {
      if (el?.classList?.contains('neux-editor')) {
        break;
      }
      paths.unshift(el);
      el = el.parentElement;
    }

    this.paths = paths;
  }

}
