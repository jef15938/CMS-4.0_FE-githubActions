export class CmsError {
  // tslint:disable-next-line: variable-name
  private _code = 1000;
  // tslint:disable-next-line: variable-name
  private _name = 'CmsError';
  // tslint:disable-next-line: variable-name
  private _message = '系統錯誤';
  // tslint:disable-next-line: variable-name
  private _messages: string[] = [];
  // tslint:disable-next-line: variable-name
  private _title = '';
  // tslint:disable-next-line: variable-name
  private _description = '系統錯誤';
  // tslint:disable-next-line: variable-name
  private _stacks: string[] = [];
  // tslint:disable-next-line: variable-name
  private _childClass: new () => any;

  get code(): number { return this._code; }
  get name(): string { return this._name; }
  get message(): string { return `[${this._code}] ${this._name} : ${this._message}\n${this._messages.join('\n    ')}`; }
  get title(): string { return this._title; }
  get description(): string { return this._description; }
  get stack(): string { return [...this._stacks].join('\n----\n'); }

  constructor(childClass?: new () => any) {
    if (childClass) {
      this._childClass = childClass;
    }
  }

  protected config(config: {
    code?: number;
    name?: string;
    message?: string;
    title?: string;
    description?: string;
  }) {
    this._code = config.code || this._code;
    this._name = config.name || this._name;
    this._message = config.message || this._message;
    this._title = config.title || this._title;
    this._description = config.description || this._description;
  }

  private clone(source: any) {
    const constructor = this._childClass || CmsError;
    const cloned = new constructor();

    const keys = Object.keys(source);
    keys.forEach(key => {
      const value = source[key];
      if (!value) { cloned[key] = value; }
      if (Array.isArray(value)) {
        cloned[key] = [...value];
        return;
      }
      const valueType = typeof (value);
      if (valueType === 'function') { return; }
      cloned[key] = value;
    });
    return cloned;
  }

  setName(name: string) {
    const cloned = this.clone(this);
    if (name) { cloned._name = name; }
    return cloned;
  }

  setMessage(message: string) {
    const cloned = this.clone(this);
    if (message) { cloned._message = message; }
    return cloned;
  }

  addMessage(message: string) {
    const cloned = this.clone(this);
    if (message) { cloned._messages.unshift(message); }
    return cloned;
  }

  setDescription(description: string) {
    const cloned = this.clone(this);
    if (description) { cloned._description = description; }
    return cloned;
  }

  addStack(stack: string) {
    const cloned = this.clone(this);
    if (stack) { cloned._stacks.unshift(stack); }
    return cloned;
  }
}
