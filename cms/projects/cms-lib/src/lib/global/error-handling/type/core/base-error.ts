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

  get code(): number { return this._code; }
  get name(): string { return this._name; }
  get message(): string { return `[${this._code}] ${this._name} : ${this._message}\n${this._messages.join('\n    ')}`; }
  get title(): string { return this._title; }
  get description(): string { return this._description; }
  get stack(): string { return [...this._stacks].join('\n----\n'); }

  constructor() { }

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

  setName(name: string) {
    if (name) { this._name = name; }
    return this;
  }

  setMessage(message: string) {
    if (message) { this._message = message; }
    return this;
  }

  addMessage(message: string) {
    if (message) { this._messages.unshift(message); }
    return this;
  }

  setDescription(description: string) {
    if (description) { this._description = description; }
    return this;
  }

  addStack(stack: string) {
    if (stack) { this._stacks.unshift(stack); }
    return this;
  }
}
