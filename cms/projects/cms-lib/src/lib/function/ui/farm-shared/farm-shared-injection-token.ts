import { InjectionToken } from '@angular/core';
import { FarmCustomHandler } from './farm-shared.interface';

export const FARM_CUSTOM_HANDLER_TOKEN = new InjectionToken<FarmCustomHandler>('FARM_CUSTOM_HANDLER_TOKEN');
