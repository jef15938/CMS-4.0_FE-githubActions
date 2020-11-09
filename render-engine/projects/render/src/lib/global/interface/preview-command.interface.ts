export interface PreviewCommand<T> {
  type: string;
  data?: T;
}

export interface PreviewCommandData {
  href: string;
  target: string;
}

