import { TABLE_CLASS_BASE_ROW } from '../const/html-editor-container.const';

export class HtmlTransformer {

  private readonly tagsToReplace = [
    'style', 'script', 'applet', 'embed', 'noframes', 'noscript',
    'o:p', 'em', 'b(?!ody)', 's(?!pan)(?!tyle)', 'u(?!l)', 'i',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ];

  private readonly attributesToClean = [
    'href', 'lang', 'style', 'class', 'height', 'width', 'name', 'border',
    'cellspacing', 'cellpadding', 'valign'
  ];

  /**
   * 內容是否從 Microsoft Office
   * @param content 檢查的內容
   */
  private isMso(content: string): boolean {
    return /class=[",']?Mso|style=[",'][^"]*\bmso-|w:WordDocument/i.test(content);
  }

  private getTransformedMsoContent(msoContent: string) {
    let content = msoContent;

    // // 1. remove line breaks / Mso classes
    // const stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
    // content = content.replace(stringStripper, ' ');
    // // 2. strip Word generated HTML comments
    // const commentSripper = new RegExp('<!--(.*?)-->', 'g');
    // content = content.replace(commentSripper, '');
    // // 3. remove tags leave content if any
    // let tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
    // content = content.replace(tagStripper, '');
    // // 4. Remove everything in between and including tags '<style(.)style(.)>'
    // const badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];
    // for (const tag of badTags) {
    //   tagStripper = new RegExp('<' + tag + '.*?' + tag + '(.*?)>', 'gi');
    //   content = content.replace(tagStripper, '');
    // }
    // // 5. remove attributes ' style="..."'
    // const badAttributes = ['style', 'start'];
    // for (const attr of badAttributes) {
    //   const attributeStripper = new RegExp(' ' + attr + '="(.*?)"', 'gi');
    //   content = content.replace(attributeStripper, '');
    // }

    content = content
      .replace(/<\!--[\s\S]*?-->/g, '')
      .replace(/<\!\[.*?\]>/g, '')
      .replace(/<a/g, '<span').replace(/<\/a>/g, '</span>')
      .replace(new RegExp(`<(${this.tagsToReplace.map(tag => `(${tag})`).join('|')})`, 'g'), '<span')
      .replace(new RegExp(`</(${this.tagsToReplace.map(tag => `(${tag})`).join('|')})>`, 'g'), '</span>');

    const html = document.createElement('html');
    html.innerHTML = content;
    const body = html.querySelector('body');

    const allElements = Array.from(body.getElementsByTagName('*'));
    allElements.forEach(el => {
      this.attributesToClean.forEach(attr => {
        el.setAttribute(attr, '');
      });
    });

    const tables = Array.from(body.querySelectorAll('table'));
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

    let innerHTML = body.innerHTML;

    this.attributesToClean.forEach(attr => {
      const regex = new RegExp(`${attr}=""`, 'g');
      innerHTML = innerHTML.replace(regex, '');
    });

    innerHTML = innerHTML
      .replace(/<p\s+><\/p>/g, '')
      .replace(/<span\s+>/g, '').replace(/<\/span>/g, '')
      ;

    return innerHTML;
  }

  transform(contentToTransform: string): string {
    const isMso = this.isMso(contentToTransform);
    if (isMso) { return this.getTransformedMsoContent(contentToTransform); }

    const html = document.createElement('html');
    html.innerHTML = contentToTransform;
    const body = html.querySelector('body');

    const tables = Array.from(body.querySelectorAll('table.neux-table'));
    tables.forEach(table => {
      const newId = `${new Date().getTime()}`;
      const tableID = table.id;
      const tableWrap = body.querySelector('[tableid].neux-table-wrap');
      table.id = newId;
      if (tableWrap) {
        tableWrap.setAttribute('tableid', `t${newId}`);
      }
    });

    return body.innerHTML;
  }
}
