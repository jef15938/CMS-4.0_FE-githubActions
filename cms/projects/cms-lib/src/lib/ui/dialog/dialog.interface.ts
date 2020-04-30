import { ViewContainerRef } from '@angular/core';

export interface DialogOpenComponentConfig {
  component: any,
  componentInitData?: any,
  dialogSetting?: {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;
    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;
    /** Width of the dialog. */
    width?: string;
    /** Height of the dialog. */
    height?: string;
    /** Min-width of the dialog. If a number is provided, assumes pixel units. */
    minWidth?: number | string;
    /** Min-height of the dialog. If a number is provided, assumes pixel units. */
    minHeight?: number | string;
    /** Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw. */
    maxWidth?: number | string;
    /** Max-height of the dialog. If a number is provided, assumes pixel units. */
    maxHeight?: number | string;
  }
}