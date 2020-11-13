import { TABLE_CLASS_BASE_ROW } from '../const/html-editor-container.const';

export class HtmlTransformer {

  private readonly attributesToClean = [
    'href', 'lang', 'style', 'class', 'height', 'width', 'cellspacing', 'cellpadding'
  ];

  transform(contentToTransform: string): string {
    const content = contentToTransform
      .replace(/<\!--[\s\S]*?-->/g, '')
      .replace(/<\!\[.*?\]>/g, '')
      .replace(/<a/g, '<span').replace(/<\/a>/g, '</span>')
      .replace(/<o:p/g, '<p').replace(/<\/o:p>/g, '</p>')
      .replace(/<em/g, '<p').replace(/<\/em>/g, '</p>')
      .replace(/<b/g, '<p').replace(/<\/b>/g, '</p>')
      .replace(/<h[1,2,3,4,5,6]/g, '<p').replace(/<\/h[1,2,3,4,5,6]>/g, '</p>')
      ;

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
}
