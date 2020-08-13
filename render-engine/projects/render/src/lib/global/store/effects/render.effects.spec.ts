import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RenderEffects } from './render.effects';

describe('RenderEffects', () => {
  let actions$: Observable<any>;
  let effects: RenderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RenderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RenderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
