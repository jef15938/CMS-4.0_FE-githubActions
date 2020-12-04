
export class NameRulesUtil {

  /**
   * 下底線轉小駝峰
   *
   * @static
   * @param {*} name
   * @return {*}
   * @memberof NameRulesUtil
   */
  static snakeToCamelCase(name: string): string {
    return name.replace(/\_(\w)/g, (all, letter) => {
      return letter.toUpperCase();
    });
  }

  /**
   * 小駝峰轉下底線
   *
   * @static
   * @param {*} name
   * @return {*}
   * @memberof NameRulesUtil
   */
  static camelCaseToSnake(name: string): string {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
}


