import { InjectionToken } from '@angular/core';
import { FarmPlugin } from './farm-shared.interface';

export const FARM_PLUGIN_TOKEN = new InjectionToken<FarmPlugin>('FARM_PLUGIN_TOKEN');
