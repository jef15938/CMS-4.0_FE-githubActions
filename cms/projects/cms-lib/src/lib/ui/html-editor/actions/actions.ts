import { IHtmlEditorContext } from '../html-editor.interface';
import {
  Bold, Italic, Underline,
  JustifyCenter, JustifyFull, JustifyLeft, JustifyRight,
  InsertOrderedList, InsertUnorderedList,
  Indent, Outdent,
  CreateLink, InsertImage,
} from './action/_index';
import { InsertTable } from './action/insert-table';
import { InsertVideo } from './action/insert-video';

export class HtmlEditorActions {
  private _context: IHtmlEditorContext;

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

  constructor(
    context: IHtmlEditorContext,
  ) {
    this._context = context;

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
  }
}