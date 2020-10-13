import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {SiteMapLanguageInfo} from './SiteMapLanguageInfo';

import { TypeFactory } from '../type-factory';

export class SiteMapInfo {

public node_id: string;
@Type(TypeFactory(SiteMapLanguageInfo))
@ValidateNested()
public languages: Array<SiteMapLanguageInfo>;
public url: string;
public url_blank: string;
@Type(TypeFactory(SiteMapInfo))
@ValidateNested()
public children: Array<SiteMapInfo>;
public content_id: string;
public content_path: string;
public is_mega_menu: boolean;
public device: string;


}