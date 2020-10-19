export function TypeFactory(type) {
  // tslint:disable-next-line: only-arrow-functions
  return function () {
    return type;
  };
}