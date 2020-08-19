import { Observable } from 'rxjs';

export type Constructor<T> = new (...args) => T;
export type MapperFunction<Source, Target> = (source: Source, target: Target) => any;

export class Mapper {
  private static store = new Map<Constructor<any>, Map<Constructor<any>, MapperFunction<any, any>>>();

  static registerMapping<Source, Target>(
    source: Constructor<Source>,
    target: Constructor<Target>,
    mapper: MapperFunction<Source, Target>,
  ): void {
    const mappings = Mapper.store.get(target) || new Map<Constructor<Source>, MapperFunction<Source, Target>>();
    mappings.set(source, mapper);
    Mapper.store.set(target, mappings);
  }

  static mapTo<Source, Target>(targetClass: Constructor<Target>, source: Source): Target {
    const sourceClass = (source as any).__proto__.constructor;
    const mappings = Mapper.store.get(targetClass);
    const mapper = mappings?.get(sourceClass);
    if (!mapper) {
      throw new Error(`No model mapping found. From class ${(sourceClass as any).name || sourceClass.toString()} to class ${(targetClass as any).name || targetClass.toString()}`);
    }
    const target = new targetClass();
    mapper(source, target);
    return target;
  }

  static rxMapTo = <Source, Target>(targetClass: Constructor<Target>) => (ob: Observable<Source>) => new Observable<Target>(observer => {
    return ob.subscribe({
      next(source) { observer.next(Mapper.mapTo(targetClass, source)); },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  })
}

export function Mapping<Source, Target>(
  sourceClass: Constructor<Source>,
  targetClass: Constructor<Target>,
  mapper: MapperFunction<Source, Target>,
) {
  return (constructor) => {
    Mapper.registerMapping<Source, Target>(sourceClass, targetClass, mapper);
  };
}
