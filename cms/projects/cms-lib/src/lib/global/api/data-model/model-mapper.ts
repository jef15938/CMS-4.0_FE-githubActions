import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Constructor<T> = new (...args) => T;
export type MapperFunction<Source, Target> = (source: Source, target: Target) => any;

export class ModelMapper {
  private static store = new Map<Constructor<any>, Map<Constructor<any>, MapperFunction<any, any>>>();

  static registerMapping<Source, Target>(
    source: Constructor<Source>,
    target: Constructor<Target>,
    mapper: MapperFunction<Source, Target>,
  ): void {
    const mappings = ModelMapper.store.get(target) || new Map<Constructor<Source>, MapperFunction<Source, Target>>();
    mappings.set(source, mapper);
    ModelMapper.store.set(target, mappings);
  }

  static mapModelTo<Source, Target>(targetClass: Constructor<Target>, source: Source): Target {
    const sourceClass = (source as any).__proto__.constructor;
    const mappings = ModelMapper.store.get(targetClass);
    const mapper = mappings?.get(sourceClass);
    if (!mapper) {
      throw new Error(`No model mapping found. From class ${(sourceClass as any).name || sourceClass.toString()} to class ${(targetClass as any).name || targetClass.toString()}`);
    }
    const target = new targetClass();
    mapper(source, target);
    return target;
  }

  // @dynamic
  static rxMapModelTo<Source, Target>(targetClass: Constructor<Target>) {
    function func(ob: Observable<Source>) {
      return ob.pipe(
        map(source => ModelMapper.mapModelTo(targetClass, source))
      );
    }
    return func;
  }

}

// @dynamic
export function ModelMapping<Source, Target>(
  sourceClass: Constructor<Source>,
  targetClass: Constructor<Target>,
  mapper: MapperFunction<Source, Target>,
) {
  return (constructor) => {
    ModelMapper.registerMapping<Source, Target>(sourceClass, targetClass, mapper);
  };
}
