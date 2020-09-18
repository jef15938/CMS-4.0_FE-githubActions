import { InjectionToken } from '@angular/core';
import { FarmTableAction, FarmCustomHandler } from './farm-shared.interface';

export const FARM_CUSTOM_HANDLER_TOKEN = new InjectionToken<FarmCustomHandler>('FARM_CUSTOM_HANDLER_TOKEN');

export const FARM_TABLE_ACTION_TOKEN = new InjectionToken<FarmTableAction>('FARM_TABLE_ACTION_TOKEN');
