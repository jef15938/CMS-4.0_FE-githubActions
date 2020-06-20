// https://github.com/fengyuanchen/cropperjs#options
export interface ICropperOption {
  /** Define the view mode of the cropper. */
  viewMode?: Cropper.ViewMode; // 0
  /** Define the dragging mode of the cropper. */
  dragMode?: Cropper.DragMode; // 'crop'
  /** Define the initial aspect ratio of the crop box. By default, it is the same as the aspect ratio of the canvas (image wrapper). */
  initialAspectRatio?: number; // NaN
  /** Define the fixed aspect ratio of the crop box. By default, the crop box is free ratio. */
  aspectRatio?: number; // NaN
  /**
   * The previous cropped data if you had stored, will be passed to setData method automatically when initialized.
   * Only available when the autoCrop option is set to true.
   */
  data?: any; // null
  /** Add extra elements (containers) for preview. */
  preview?: Element | Element[] | NodeList | ''; // ''
  /** Re-render the cropper when resizing the window. */
  responsive?: boolean; // true
  /** Restore the cropped area after resizing the window. */
  restore?: boolean; // true
  /** Check if the current image is a cross-origin image. */
  checkCrossOrigin?: boolean; // true
  /** Check the current image's Exif Orientation information. Note that only a JPEG image may contains Exif Orientation information. */
  checkOrientation?: boolean; // true
  /** Show the black modal above the image and under the crop box. */
  modal?: boolean; // true
  /** Show the dashed lines above the crop box. */
  guides?: boolean; // true
  /** Show the center indicator above the crop box. */
  center?: boolean; // true
  /** Show the white modal above the crop box (highlight the crop box). */
  highlight?: boolean; // true
  /** Show the grid background of the container. */
  background?: boolean; // true
  /** Enable to crop the image automatically when initialized. */
  autoCrop?: boolean; // true
  /** A number between 0 and 1. Define the automatic cropping area size (percentage). */
  autoCropArea?: number; // 0.8
  /** Enable to move the image. */
  movable?: boolean; // true
  /** Enable to rotate the image. */
  rotatable?: boolean; // true
  /** Enable to scale the image. */
  scalable?: boolean; // true
  /** Enable to zoom the image. */
  zoomable?: boolean; // true
  /** Enable to zoom the image by dragging touch. */
  zoomOnTouch?: boolean; // true
  /** Enable to zoom the image by wheeling mouse. */
  zoomOnWheel?: boolean; // true
  /** Define zoom ratio when zooming the image by wheeling mouse. */
  wheelZoomRatio?: number; // 0.1
  /** Enable to move the crop box by dragging. */
  cropBoxMovable?: boolean; // true
  /** Enable to resize the crop box by dragging. */
  cropBoxResizable?: boolean; // true
  /** Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper. */
  toggleDragModeOnDblclick?: boolean; // true
  /** The minimum width of the container. */
  minContainerWidth?: number; // 200
  /** The minimum height of the container. */
  minContainerHeight?: number; // 100
  /** The minimum width of the canvas (image wrapper). */
  minCanvasWidth?: number; // 0
  /** The minimum height of the canvas (image wrapper). */
  minCanvasHeight?: number; // 0
  /** The minimum width of the crop box. */
  minCropBoxWidth?: number; // 0
  /** The minimum height of the crop box. */
  minCropBoxHeight?: number; // 0
  /** A shortcut of the ready event. */
  ready?: () => any; // null
  /** A shortcut of the cropstart event. */
  cropstart?: () => any; // null
  /** A shortcut of the cropmove event. */
  cropmove?: () => any; // null
  /** A shortcut of the cropend event. */
  cropend?: () => any; // null
  /** A shortcut of the crop event. */
  crop?: () => any; // null
  /** A shortcut of the zoom event. */
  zoom?: () => any; // null
}
