import { Component, OnInit, Input } from '@angular/core';
import { IHtmlEditorContext } from '../../html-editor.interface';

@Component({
  selector: 'cms-editor-selected-path',
  templateUrl: './editor-selected-path.component.html',
  styleUrls: ['./editor-selected-path.component.scss']
})
export class EditorSelectedPathComponent implements OnInit {

  @Input() context: IHtmlEditorContext;

  paths: HTMLElement[] = [];

  constructor() { }

  ngOnInit(): void {
    this.context.selectedChange$.subscribe((selected: HTMLElement) => {
      const paths: HTMLElement[] = [];

      let el = selected;

      while (el) {
        if (el && el.classList.contains('neux-editor')) {
          break;
        }
        paths.unshift(el);
        el = el.parentElement;
      }

      this.paths = paths;
    })
  }

}
