import { HtmlEditorContext } from '../html-editor.interface';
import {
  Bold, Italic, Underline,
  JustifyCenter, JustifyFull, JustifyLeft, JustifyRight,
  InsertOrderedList, InsertUnorderedList,
  Indent, Outdent, Highlight, Unhighlight,
  CreateLink, InsertImage, InsertTable, InsertVideo,
} from './action/_index';
import { InsertFile } from './action/insert-file';

export class HtmlEditorActions {
  private context: HtmlEditorContext;

  bold: Bold;
  italic: Italic;
  underline: Underline;
  justifyCenter: JustifyCenter;
  justifyFull: JustifyFull;
  justifyLeft: JustifyLeft;
  justifyRight: JustifyRight;
  insertOrderedList: InsertOrderedList;
  insertUnorderedList: InsertUnorderedList;
  indent: Indent;
  outdent: Outdent;
  createLink: CreateLink;
  insertImage: InsertImage;
  insertTable: InsertTable;
  insertVideo: InsertVideo;
  highlight1: Highlight;
  highlight2: Highlight;
  highlight3: Highlight;
  unhighlight: Unhighlight;
  insertFile: InsertFile;

  constructor(
    context: HtmlEditorContext,
  ) {
    this.context = context;

    this.bold = new Bold(context);
    this.italic = new Italic(context);
    this.underline = new Underline(context);
    this.justifyCenter = new JustifyCenter(context);
    this.justifyFull = new JustifyFull(context);
    this.justifyLeft = new JustifyLeft(context);
    this.justifyRight = new JustifyRight(context);
    this.insertOrderedList = new InsertOrderedList(context);
    this.insertUnorderedList = new InsertUnorderedList(context);
    this.indent = new Indent(context);
    this.outdent = new Outdent(context);
    this.createLink = new CreateLink(context);
    this.insertImage = new InsertImage(context);
    this.insertTable = new InsertTable(context);
    this.insertVideo = new InsertVideo(context);
    this.highlight1 = new Highlight(context, 1);
    this.highlight2 = new Highlight(context, 2);
    this.highlight3 = new Highlight(context, 3);
    this.unhighlight = new Unhighlight(context);
    this.insertFile = new InsertFile(context, this.createLink, this.insertImage);
  }
}
