export class CmsValidator {

  static hasValue(v) {
    return v || v === 0 ? true : false;
  }

  static isNumber(v) {
    return isNaN(v) ? false : true;
  }
}