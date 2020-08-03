import { ViewContainerRef, Type, TemplateRef } from '@angular/core';
import { CustomModalBase } from './base/custom-modal-base';

export interface ModalSetting {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the modal. This does not affect where the modal
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;
  /** ID for the modal. If omitted, a unique one will be generated. */
  id?: string;
  /** Width of the modal. */
  width?: string;
  /** Height of the modal. */
  height?: string;
  /** Min-width of the modal. If a number is provided, assumes pixel units. */
  minWidth?: number | string;
  /** Min-height of the modal. If a number is provided, assumes pixel units. */
  minHeight?: number | string;
  /** Max-width of the modal. If a number is provided, assumes pixel units. Defaults to 80vw. */
  maxWidth?: number | string;
  /** Max-height of the modal. If a number is provided, assumes pixel units. */
  maxHeight?: number | string;
  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy).
   */
  closeOnNavigation?: false;
  autoFocus?: boolean;
}

export interface ModalOpenComponentConfig<TComponent extends CustomModalBase> {
  component: Type<TComponent> | TemplateRef<TComponent>;
  componentInitData?: Partial<TComponent>;
  modalSetting?: ModalSetting;
}
