import { Component, OnInit, Input } from '@angular/core';
import { HtmlEditorContext } from '../../html-editor.interface';
import { HtmlEditorActions } from '../../actions/actions';
import { HtmlEditorAction } from '../../actions/action.interface';

@Component({
  selector: 'cms-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {

  @Input() context: HtmlEditorContext;

  htmlEditorActions: HtmlEditorActions;

  constructor() { }

  ngOnInit(): void {
    this.htmlEditorActions = new HtmlEditorActions(this.context);
  }

  doAction(action: HtmlEditorAction) {
    this.context.doAction(action);
  }

}
