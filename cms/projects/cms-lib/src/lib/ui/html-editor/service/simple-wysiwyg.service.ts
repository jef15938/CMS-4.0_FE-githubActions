import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleWysiwygService {

  getSelectionCollapsed = function (containerNode) {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.isCollapsed)
        return true;
      return false;
    }
    else if (document['selection']) {
      const sel = document['selection'];
      if (sel.type == 'Text') {
        const range = document['selection'].createRange();
        const textrange = document.body['createTextRange']();
        textrange.moveToElementText(containerNode);
        textrange.setEndPoint('EndToStart', range);
        return range.htmlText.length == 0;
      }
      if (sel.type == 'Control') // e.g. an image selected
        return false;
      // sel.type == 'None' -> collapsed selection
    }
    return true;
  };

  // http://stackoverflow.com/questions/4652734/return-html-from-a-user-selected-text/4652824#4652824
  getSelectionHtml(containerNode: Node) {
    if (this.getSelectionCollapsed(containerNode))
      return null;
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var container = document.createElement('div'),
          len = sel.rangeCount;
        for (var i = 0; i < len; ++i) {
          var contents = sel.getRangeAt(i).cloneContents();
          container.appendChild(contents);
        }
        return container.innerHTML;
      }
    }
    else if (document['selection']) {
      var sel = document['selection'];
      if (sel.type == 'Text') {
        var range = sel['createRange']();
        return range.htmlText;
      }
    }
    return null;
  };

  clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document['selection']) {  // IE?
      document['selection'].empty();
    }
  }

  // save/restore selection
  // http://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
  saveSelection(): Range {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.rangeCount > 0)
        return sel.getRangeAt(0);
    }
    else if (document['selection']) {
      const sel = document['selection'];
      return sel['createRange']();
    }
    return null;
  };

  restoreSelection(savedSel: Range) {
    if (!savedSel)
      return;
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSel);
    }
    else if (document['selection']) {
      savedSel['select']();
    }
  };

  setSelectionOnNode(node: Node, start = 0, end = 0) {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    this.restoreSelection(range);
  }

  // http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
  isOrContainsNode = function (ancestor, descendant) {
    let node = descendant;
    while (node) {
      if (node === ancestor)
        return true;
      node = node.parentNode;
    }
    return false;
  };

  selectionInside(containerNode: Node, force = true) {
    // selection inside editor?
    if (window.getSelection) {
      const sel = window.getSelection();
      if (this.isOrContainsNode(containerNode, sel.anchorNode) && this.isOrContainsNode(containerNode, sel.focusNode))
        return true;
      // selection at least partly outside editor
      if (!force)
        return false;
      // force selection to editor
      const range = document.createRange();
      range.selectNodeContents(containerNode);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    else if (document['selection']) {
      const sel = document['selection'];
      if (sel.type == 'Control') // e.g. an image selected
      {
        // http://msdn.microsoft.com/en-us/library/ie/hh826021%28v=vs.85%29.aspx
        const range = sel['createRange']();
        if (range['length'] != 0 && this.isOrContainsNode(containerNode, range[0])) // test only the first element
          return true;
      }
      else //if( sel.type == 'Text' || sel.type == 'None' )
      {
        // Range of container
        // http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
        const rangeContainer = document.body['createTextRange']();
        rangeContainer.moveToElementText(containerNode);
        // Compare with selection range
        const range = sel['createRange']();
        if (rangeContainer.inRange(range))
          return true;
      }
      // selection at least partly outside editor
      if (!force)
        return false;
      // force selection to editor
      // http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
      const range = document.body['createTextRange']();
      range['moveToElementText'](containerNode);
      range.setEndPoint('StartToEnd', range); // collapse
      range.select();
    }
    return true;
  };

  // exec command
  // https://developer.mozilla.org/en-US/docs/Web/API/document.execCommand
  // http://www.quirksmode.org/dom/execCommand.html
  execCommand(containerNode: Node, command: string, param?, force_selection?: boolean) {
    // give selection to contenteditable element
    // this.restoreSelection(containerNode, popup_saved_selection);

    if (!this.selectionInside(containerNode, true)) {// returns 'selection inside editor'
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
    else if (document['selection']) {
      const sel = document['selection'];
      if (sel.type != 'None') {
        const range = sel.createRange();
        // Buggy, call within 'try/catch'
        try {
          if (!range.queryCommandEnabled(command))
            return false;
          return range.execCommand(command, false, param);
        }
        catch (e) {
        }
      }
    }
    return false;
  };

  insertImage(containerNode: Node, url: string) {
    this.execCommand(containerNode, 'insertImage', url, true);
    // this.callUpdates(true); // selection destroyed
    return this;
  }
}