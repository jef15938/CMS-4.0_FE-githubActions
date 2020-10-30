export interface CustomActionInfo {
  datas: CustomAction[];
}

export interface CustomAction {
  actionID: string;
  actionName: string;
}

export interface CustomActionFunc extends CustomAction {
  fn(injector): any;
}
