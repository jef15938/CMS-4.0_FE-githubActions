import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelecitonRangeService {

  // https://gist.github.com/dantaex/543e721be845c18d2f92652c0ebe06aa
  getRange(): Range {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        return range;
      }
    } else if (document['selection'] && document['selection'].createRange) {
      const range = document['selection'].createRange();
      return range;
    }
    return null;
  }

  // https://gist.github.com/dantaex/543e721be845c18d2f92652c0ebe06aa
  restoreRange(range: Range) {
    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document['selection'] && range['select']) {
        range['select']();
      }
    }
  }

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

  setSelectionOnNode(node: Node, start = 0, end = 0) {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    this.restoreRange(range);
  }
}