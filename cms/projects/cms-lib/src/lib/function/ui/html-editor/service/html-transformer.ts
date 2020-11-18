import { TABLE_CLASS_BASE_ROW } from '../const/html-editor-container.const';

export class HtmlTransformer {

  private readonly tagsToRemove = [
    'v:shape', 'v:shapetype', 'v:imagedata', 'img'
  ];

  private readonly tagsToReplaceWithP = [
    'style', 'script', 'applet', 'noframes', 'noscript', 'embed', 'o:p',
    'em', 'b(?!ody)(?!r)', 's(?!pan)(?!tyle)', 'u(?!l)', 'i(?!mg)(?!frame)', 'a',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  ].map(tag => `(${tag})`).join('|');

  private readonly attributesToClean = [
    'href', 'lang', 'style', 'class', 'name', 'border',
    'cellspacing', 'cellpadding', 'valign', 'unselectable', 'src', 'role',
    'xml', 'xml:', 'xml:lang', 'paraid', 'paraeid', 'data-contrast', 'role', 'xml:', 'data-ccp-props'
  ];

  transform(contentToTransform: string): string {
    console.warn({ tagsToRemove: this.tagsToRemove, tagsToReplaceWithP: this.tagsToReplaceWithP, });
    let content = contentToTransform;

    this.tagsToRemove.forEach(tag => {
      content = content.replace(new RegExp(`<${tag} .*?>`, 'g'), '');
      content = content.replace(new RegExp(`</${tag}>`, 'g'), '');
    });

    content = content
      .replace(/<\!--[\s\S]*?-->/g, '')
      .replace(/<\!\[.*?\]>/g, '')
      .replace(new RegExp(`<(${this.tagsToReplaceWithP})`, 'g'), '<span')
      .replace(new RegExp(`</(${this.tagsToReplaceWithP})>`, 'g'), '</span>')
      ;

    const html = document.createElement('html');
    html.innerHTML = content;
    const body = html.querySelector('body');

    const allElements = Array.from(body.getElementsByTagName('*'));

    this.transformCmsTable(allElements, body);

    allElements.forEach(el => {
      if (this.tagsToRemove.indexOf(el.tagName?.toLowerCase()) > -1) {
        el.parentElement.removeChild(el);
        return;
      }
      this.attributesToClean.forEach(attr => {
        el.setAttribute(attr, '');
      });
    });

    this.tansformTable(allElements);


    let innerHTML = body.innerHTML;

    this.attributesToClean.forEach(attr => {
      const regex = new RegExp(`${attr}=""`, 'g');
      innerHTML = innerHTML.replace(regex, '');
    });

    innerHTML = innerHTML
      .replace(/xml:/g, '')
      .replace(/<p\s+><\/p>/g, '')
      .replace(/<span\s+>/g, '').replace(/<\/span>/g, '')
      ;

    return innerHTML;
  }

  /** 避免從編輯器上複製再貼上的時候，處理 table 的階段異常，因此先將 neux-table 轉回成一般 table */
  private transformCmsTable(elements: Element[], container: HTMLElement) {
    const cmsTables = elements.filter(el => el.classList?.contains('neux-table'));
    cmsTables.forEach(table => {
      const tableID = table.id;
      const tableWrap = container.querySelector(`[tableid=t${tableID}].neux-table-wrap`);
      if (tableWrap) {
        tableWrap.parentElement.insertBefore(table, tableWrap);
        tableWrap.parentElement.removeChild(tableWrap);
      }
      const firstTBodyTr = table.querySelector('tbody > tr');
      const tHeadTrs = Array.from(table.querySelectorAll('thead > tr'));
      tHeadTrs.forEach(tr => {
        tr.parentElement.removeChild(tr);
      });
      table.querySelector('thead').appendChild(firstTBodyTr);
    });
  }

  private tansformTable(elements: Element[]) {
    const tables = elements.filter(el => el.tagName?.toLowerCase() === 'table');
    tables.forEach(table => {
      const colgroups = table.querySelectorAll('colgroup');
      colgroups.forEach(cg => {
        cg.parentElement.removeChild(cg);
      });

      const headerTr = Array.from(table.querySelectorAll('thead>tr')).filter(tr => !tr.classList.contains(TABLE_CLASS_BASE_ROW))[0];
      if (!headerTr) { return; }
      // <th> to <td>
      const ths = Array.from(headerTr.querySelectorAll('th')).concat(Array.from(headerTr.querySelectorAll('td')));
      ths.forEach(th => {
        const td = document.createElement('td');
        th.classList.forEach(c => {
          td.classList.add(c);
        });
        td.colSpan = th.colSpan;
        td.rowSpan = th.rowSpan;
        td.innerHTML = th.innerHTML;
        headerTr.insertBefore(td, th);
        headerTr.removeChild(th);
      });
      // insert <tr> to <tbody>
      const tbody = table.querySelector('tbody');
      const firstTr = tbody.firstElementChild;
      !!firstTr ? tbody.insertBefore(headerTr, firstTr) : tbody.appendChild(headerTr);
    });
  }
}
