import { Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';

export class CommonUtils {

  // @dynamic
  static isMobile$(resize$: Observable<Event>): Observable<boolean> {
    const result = resize$
    .pipe(
      startWith({ target: { innerWidth: window.innerWidth } }),
    )
    .pipe(
      // tap(_ => console.warn('resize')),
      debounceTime(200),
      map(e => (e.target as Window).innerWidth),
      // startWith(window.innerWidth),
      map((width) => width < 768)
    );
    return result;
  }
}
