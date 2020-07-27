import { PageInfoGetResponse } from '../api/neuxAPI/bean/PageInfoGetResponse';
import { PageInfo } from '../interface/page-info.interface';
import { SiteMapGetResponse } from '../api/neuxAPI/bean/SiteMapGetResponse';
import { SitemapNode } from '../interface/sitemap-node.interface';
import { ContentInfo as ApiContentInfo } from '../api/neuxAPI/bean/ContentInfo';
import { LanguageInfo as ApiLanguageInfo } from '../api/neuxAPI/bean/LanguageInfo';
import { ContentInfo, LanguageInfo, ContentTemplateInfo, FieldInfo, FieldType } from '../interface';
import { ContentTemplateInfo as ApiContentTemplateInfo } from '../api/neuxAPI/bean/ContentTemplateInfo';
import { ContentFieldInfo } from '../api/neuxAPI/bean/ContentFieldInfo';

export const convertPageInfo: (info: PageInfoGetResponse) => PageInfo = (origin: PageInfoGetResponse) => {
  return {
    layoutID: origin.layout_id,
    metaTitle: origin.meta_title,
    metaDescription: origin.meta_description,
    metaKeyword: origin.meta_keyword,
    metaImage: origin.meta_image,
    contentID: origin.content_id,
    lang: origin.lang,
    nodeRoot: origin.node_root
  };
};

export const convertSitemapNode: (origin: SiteMapGetResponse) => SitemapNode = (origin: SiteMapGetResponse) => {
  return {
    nodeID: origin.node_id,
    nodeName: origin.node_name,
    url: origin.url,
    urlTarget: origin.url_blank === 'Y' ? '_blank' : '_self',
    children: origin.children.map(x => convertSitemapNode(x)),
    contentID: origin.content_id
  };
};


export const convertContentInfo: (origin: ApiContentInfo) => ContentInfo = (origin: ApiContentInfo) => {
  return {
    languages: origin.languages.map(x => convertLanguageInfo(x))
  };
};

export const convertLanguageInfo: (origin: ApiLanguageInfo) => LanguageInfo = (origin: ApiLanguageInfo) => {
  return {
    languageID: origin.language_id,
    languageName: origin.language_name,
    templates: origin.templates.map(x => convertTemplateInfo(x)),
    galleries: origin.galleries
  };
};

export const convertTemplateInfo: (origin: ApiContentTemplateInfo) => ContentTemplateInfo = (origin: ApiContentTemplateInfo) => {
  const { id, templateId, fields, attributes, ...rest } = origin;

  return {
    id: origin.id,
    templateId: origin.templateId,
    fields: origin.fields.map(x => convertFieldInfo(x)),
    attributes: (origin.attributes as { [key: string]: string; }),
    ...rest
  };
};

export const convertFieldInfo: (origin: ContentFieldInfo) => FieldInfo = (origin: ContentFieldInfo) => {

  return {
    fieldId: origin.fieldId,
    fieldType: (origin.fieldType as FieldType),
    fieldVal: origin.fieldVal,
    extension: (origin.extension as { [key: string]: string; })
  };

};

