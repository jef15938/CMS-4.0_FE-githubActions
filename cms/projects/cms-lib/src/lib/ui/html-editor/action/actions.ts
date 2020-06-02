import { Injectable } from '@angular/core';
import { Bold, Italic, Underline, JustifyCenter, JustifyFull, JustifyLeft, JustifyRight, InsertOrderedList, InsertUnorderedList, Indent, Outdent, CreateLink, InsertImage } from './dom-cmd-action';

@Injectable({ providedIn: 'root' })
export class HtmlEditorActions {
  constructor(
    public bold: Bold,
    public italic: Italic,
    public underline: Underline,
    public justifyCenter: JustifyCenter,
    public justifyFull: JustifyFull,
    public justifyLeft: JustifyLeft,
    public justifyRight: JustifyRight,
    public insertOrderedList: InsertOrderedList,
    public insertUnorderedList: InsertUnorderedList,
    public indent: Indent,
    public outdent: Outdent,
    public createLink: CreateLink,
    public insertImage: InsertImage,
  ) {

  }
}