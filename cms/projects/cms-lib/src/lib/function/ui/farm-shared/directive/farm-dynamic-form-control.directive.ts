import {
  Directive, OnInit, ComponentRef, Output, EventEmitter,
  Optional, Host, SkipSelf, ComponentFactoryResolver, ViewContainerRef, OnDestroy, Inject, Input, ChangeDetectorRef, Self
} from '@angular/core';
import { NgControl, FormControl, ControlContainer, ValidatorFn, AsyncValidatorFn, Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';
import { DynamicComponentFactoryService } from '@neux/render';

function normalizeValidator(validator: ValidatorFn | Validator): ValidatorFn {
  if ((validator as Validator).validate) {
    return (c: AbstractControl) => (validator as Validator).validate(c);
  } else {
    return validator as ValidatorFn;
  }
}

@Directive({
  selector: '[cmsFarmDynamicFormControl]'
})
export class FarmDynamicFormControlDirective extends NgControl implements OnInit, OnDestroy {

  @Input() componentId = '';
  @Input() columnId = '';

  componentRef: ComponentRef<any>;

  // tslint:disable-next-line: no-output-rename
  @Output('ngModelChange') update = new EventEmitter();

  private myControl: FormControl;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    @Optional() @Self() @Inject(NG_VALIDATORS) private validators: Array<Validator | ValidatorFn>,
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
  ) {
    super();
  }

  ngOnInit() {
    const component = this.dynamicComponentFactoryService.getComponent(this.componentId);
    const componentFactory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(componentFactory);
    this.valueAccessor = this.componentRef.instance;

    const ngValidators = this.componentRef.injector.get(NG_VALIDATORS, null);
    if (ngValidators && ngValidators.some(x => x === this.componentRef.instance)) {
      this.validators = [...(this.validators || []), ...(ngValidators as Array<Validator | ValidatorFn>)];
    }

    this.myControl = this.formDirective.addControl(this);
  }

  get path(): string[] {
    return [...this.parent.path!, this.columnId];
  }

  get formDirective(): any { return this.parent ? this.parent.formDirective : null; }

  get control(): FormControl { return this.myControl; }

  get validator(): ValidatorFn | null {
    return this.validators != null ? Validators.compose(this.validators.map(normalizeValidator)) : null;
  }

  get asyncValidator(): AsyncValidatorFn { return null; }

  viewToModelUpdate(newValue: any): void {
    this.update.emit(newValue);
  }

  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
