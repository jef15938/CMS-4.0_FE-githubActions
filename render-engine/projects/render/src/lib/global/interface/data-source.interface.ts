import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';

export interface DataSourceTemplateInfo extends ContentTemplateInfoModel {
  source: string;
}

export interface NewsData {
  id: string;
  title: string;
  start_date: string;
  url: string;
}


export interface SliderData {
  id: string;
  title: string;
  picture: string;
  url: string;
  description: string;
}

export interface QaData {
  id: string;
  question: string;
  answer: string;
}

export interface DownloadData {
  id: string;
  title: string;
  url: string;
}
