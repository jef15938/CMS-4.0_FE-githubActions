import { Component, OnInit, Input } from '@angular/core';
import { HtmlEditorContext, HtmlEditorConfig } from '../../html-editor.interface';
import { HtmlEditorActions } from '../../actions/actions';
import { HtmlEditorAction } from '../../actions/action.interface';
import { ModalService } from '../../../modal';
import { HtmlEditorDescriptionComponent } from '../../modal/html-editor-description/html-editor-description.component';

@Component({
  selector: 'cms-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {

  @Input() context: HtmlEditorContext;
  @Input() config: HtmlEditorConfig;

  htmlEditorActions: HtmlEditorActions;

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.htmlEditorActions = new HtmlEditorActions(this.context);
  }

  doAction(action: HtmlEditorAction) {
    this.context.doAction(action);
  }

  openDescription() {
    this.modalService.openComponent({ component: HtmlEditorDescriptionComponent }).subscribe();
  }

}
