import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnInit, AfterContentChecked {

  @Input() htmlString;
  @Input() runtime = false;

  html: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    const div = document.createElement('div');
    div.innerHTML = this.htmlString;
    if (!this.runtime) {
      const insides = div.querySelectorAll('a[urltype="INSIDE"]');
      insides.forEach(node => {
        node.removeAttribute('target');
        node.removeAttribute('href');
        node.setAttribute('href', 'javascript: void(0)');
      });
    }
    this.html = div.innerHTML;
  }

}
