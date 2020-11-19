import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleWysiwygService {

  hasHighlight(editorContainer: HTMLDivElement) {
    const range = this.getRange();
    if (!range) { return false; }
    const highlightClass = 'highlight';

    if (range.startContainer === range.endContainer) {
      let el = range.startContainer as HTMLElement;
      let hasHighlight = false;
      while (el && el !== editorContainer) {
        if (el.classList?.contains(highlightClass)) {
          hasHighlight = true;
          el = undefined;
        } else {
          el = el.parentElement;
        }
      }
      return hasHighlight;
    } else {
      const fragment = range.cloneContents();
      const elementsInRange = Array.from(fragment.querySelectorAll('*'));
      return elementsInRange.some(el => el.classList.contains(highlightClass));
    }
  }

  // tslint:disable-next-line: only-arrow-functions
  getSelectionCollapsed = function(containerNode) {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.isCollapsed) {
        return true;
      }
      return false;
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      if (sel.type === 'Text') {
        // tslint:disable-next-line: no-string-literal
        const range = document['selection'].createRange();
        // tslint:disable-next-line: no-string-literal
        const textrange = document.body['createTextRange']();
        textrange.moveToElementText(containerNode);
        textrange.setEndPoint('EndToStart', range);
        // tslint:disable-next-line: triple-equals
        return range.htmlText.length == 0;
      }
      // tslint:disable-next-line: triple-equals
      if (sel.type == 'Control') { // e.g. an image selected
        return false;
      }
      // sel.type == 'None' -> collapsed selection
    }
    return true;
  };

  // http://stackoverflow.com/questions/4652734/return-html-from-a-user-selected-text/4652824#4652824
  getSelectionHtml(containerNode: Node) {
    if (this.getSelectionCollapsed(containerNode)) {
      return null;
    }

    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const container = document.createElement('div');
        const len = sel.rangeCount;
        for (let i = 0; i < len; ++i) {
          const contents = sel.getRangeAt(i).cloneContents();
          container.appendChild(contents);
        }
        return container.innerHTML;
      }
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      if (sel.type === 'Text') {
        const range = sel.createRange();
        return range.htmlText;
      }
    }
    return null;
  }

  clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
      // tslint:disable-next-line: no-string-literal
    } else if (document['selection']) {  // IE?
      // tslint:disable-next-line: no-string-literal
      document['selection'].empty();
    }
  }

  getSelection(): Selection {
    if (window.getSelection) {
      const sel = window.getSelection();
      return sel;
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      return sel;
    }
    return null;
  }

  // save/restore selection
  // http://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
  getRange(): Range {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        return sel.getRangeAt(0);
      }
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      return sel.createRange();
    }
    return null;
  }

  restoreSelection(range: Range) {
    if (!range) {
      return;
    }
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      range['select']();
    }
  }

  setSelectionOnNode(node: Node, start = 0, end = 0) {
    const range = document.createRange();

    const parent = node.parentNode;
    const children: any[] = Array.from(parent.childNodes);
    const index = children.indexOf(node);
    range.setStart(parent, index);
    range.setEnd(parent, index + 1);
    this.restoreSelection(range);
  }

  // http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
  // tslint:disable-next-line: only-arrow-functions
  isOrContainsNode = function(ancestor, descendant) {
    let node = descendant;
    while (node) {
      if (node === ancestor) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  isChildOf(child: Node, parent: HTMLElement): boolean {
    if (!child || child === parent) { return false; }
    if (parent.contains(child)) { return true; }
    return this.isChildOf(child.parentNode, parent);
  }

  isSelectionInside(containerNode: Node, force?: boolean) {
    // selection inside editor?
    if (window.getSelection) {
      const sel = window.getSelection();
      if (this.isOrContainsNode(containerNode, sel.anchorNode) && this.isOrContainsNode(containerNode, sel.focusNode)) {
        return true;
      } else {
        return false;
        // // selection at least partly outside editor
        // if (!force)
        //   return false;
        // // force selection to editor
        // const range = document.createRange();
        // range.selectNodeContents(containerNode);
        // range.collapse(false);
        // sel.removeAllRanges();
        // sel.addRange(range);
      }
    }
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      if (sel.type === 'Control') // e.g. an image selected
      {
        // http://msdn.microsoft.com/en-us/library/ie/hh826021%28v=vs.85%29.aspx
        const range = sel.createRange();
        // tslint:disable-next-line: triple-equals
        if (range.length != 0 && this.isOrContainsNode(containerNode, range[0])) { // test only the first element
          return true;
        }
      }
      else // if( sel.type == 'Text' || sel.type == 'None' )
      {
        // Range of container
        // http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
        // tslint:disable-next-line: no-string-literal
        const rangeContainer = document.body['createTextRange']();
        rangeContainer.moveToElementText(containerNode);
        // Compare with selection range
        const range = sel.createRange();
        if (rangeContainer.inRange(range)) {
          return true;
        }
      }
      return false;
      // // selection at least partly outside editor
      // if (!force)
      //   return false;
      // // force selection to editor
      // // http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
      // const range = document.body['createTextRange']();
      // range['moveToElementText'](containerNode);
      // range.setEndPoint('StartToEnd', range); // collapse
      // range['select']();
    }
    return true;
  }

  // exec command
  // https://developer.mozilla.org/en-US/docs/Web/API/document.execCommand
  // http://www.quirksmode.org/dom/execCommand.html
  execCommand(containerNode: Node, command: string, param?) {
    // give selection to contenteditable element
    // this.restoreSelection(containerNode, popup_saved_selection);

    if (!this.isSelectionInside(containerNode)) {// returns 'selection inside editor'
      return false;
    }

    // for webkit, mozilla, opera
    if (window.getSelection) {
      // Buggy, call within 'try/catch'
      try {
        if (document.queryCommandSupported && !document.queryCommandSupported(command)) {
          return false;
        }
        return document.execCommand(command, false, param);
      }
      catch (e) {
      }
    }
    // for IE
    // tslint:disable-next-line: no-string-literal
    else if (document['selection']) {
      // tslint:disable-next-line: no-string-literal
      const sel = document['selection'];
      if (sel.type !== 'None') {
        const range = sel.createRange();
        // Buggy, call within 'try/catch'
        try {
          if (!range.queryCommandEnabled(command)) {
            return false;
          }
          return range.execCommand(command, false, param);
        }
        catch (e) {
        }
      }
    }
    return false;
  }

  insertHtmlElement<TElement extends HTMLElement>(elToAdd: TElement, editorContainer: HTMLElement): TElement {
    const range = this.getRange();
    if (!range) { return null; }

    const modifiedId = 'to-modify';
    elToAdd.id = modifiedId;
    const htmlString = elToAdd.outerHTML;
    document.execCommand('ms-beginUndoUnit');

    const success = document.execCommand('InsertHTML', false, htmlString);
    if (!success) {
      range.insertNode(elToAdd);
      document.execCommand('ms-endUndoUnit');
    }

    const added = editorContainer.querySelector(`#${modifiedId}`) as TElement;
    if (added) {
      added.removeAttribute('id');
    }
    return added;
  }

  insertHtmlString(htmlString: string, editorContainer: HTMLElement) {
    const range = this.getRange();
    if (!range) { return null; }

    document.execCommand('ms-beginUndoUnit');

    const success = document.execCommand('InsertHTML', false, htmlString);
    if (!success) {
      // range.insertNode(elToAdd);
      document.execCommand('ms-endUndoUnit');
    }
  }

  createBlankRow() {
    const blankP = document.createElement('p');
    blankP.innerHTML = '<br>';
    return blankP;
  }

  findRowRoot(containerNode: Node, from: HTMLElement) {
    const possibleTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'ul', 'ol'];
    let el = from;
    while (el) {
      if (el === containerNode || !this.isChildOf(el, containerNode as any)) {
        el = undefined;
        break;
      }
      if (possibleTags.indexOf(el.tagName?.toLowerCase()) > -1) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  }

  findTagFromTargetToContainer(editorContainer: HTMLDivElement, target: HTMLElement, tag: string): HTMLElement {
    tag = tag?.toLowerCase();

    const targetName = target.tagName?.toLowerCase();
    if (targetName === tag) { return target; }
    let el = target.parentElement;
    let result: HTMLElement;
    while (!!el) {
      if (el === editorContainer) {
        break;
      }
      const elTagName = el.tagName?.toLowerCase();
      if (elTagName === tag) {
        result = el;
        break;
      }
      el = el.parentElement;
    }
    return result;
  }

  insertBlankRowToElement(el: HTMLElement, { insertBefore = true, insertAfter = true } = {}) {
    if (!el) { return; }
    if (insertBefore) {
      const blankRowBefore = this.createBlankRow();
      el.parentElement.insertBefore(blankRowBefore, el);
    }
    if (insertAfter) {
      const nextOfEl = el.nextElementSibling;
      const blankRowAfter = this.createBlankRow();
      if (nextOfEl) {
        el.parentElement.insertBefore(blankRowAfter, nextOfEl);
      } else {
        el.parentElement.appendChild(blankRowAfter);
      }
    }
  }
}
