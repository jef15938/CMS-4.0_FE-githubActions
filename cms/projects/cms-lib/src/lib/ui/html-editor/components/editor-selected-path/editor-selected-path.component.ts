import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cms-editor-selected-path',
  templateUrl: './editor-selected-path.component.html',
  styleUrls: ['./editor-selected-path.component.scss']
})
export class EditorSelectedPathComponent implements OnInit, OnChanges {

  @Input() selected: HTMLElement;

  paths: HTMLElement[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    const paths: HTMLElement[] = [];

    let el = this.selected;

    while (el) {
      if (el && el.classList.contains('neux-editor')) {
        break;
      }
      paths.unshift(el);
      el = el.parentElement;
    }

    this.paths = paths;
  }

  ngOnInit(): void { }

}
