import { FarmFormValidationErrorsPipe } from './farm-form-validation-errors.pipe';

describe('FarmFormValidationErrorsPipe', () => {
  it('create an instance', () => {
    const pipe = new FarmFormValidationErrorsPipe();
    expect(pipe).toBeTruthy();
  });
});
