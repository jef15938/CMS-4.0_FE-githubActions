export interface ITableSetting {
  cols: number;
}

export interface ITableController {
  el: HTMLTableElement;
  getSetting(): ITableSetting;
}