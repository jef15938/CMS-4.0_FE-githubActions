import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ConfigToken, RestHeaderToken } from '@neux/core';
import { environment } from 'src/environments/environment';
import { GlobalHeader } from './common/global-header';
import { CmsLibModule } from 'projects/cms-lib/src/lib/cms-lib.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMPONENT_SERVICE_TOKEN } from 'layout';
import { DynamicComponentFactoryService } from './service/dynamic-component-factory.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CmsLibModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: ConfigToken, useValue: environment },
    { provide: RestHeaderToken, useExisting: GlobalHeader },
    { provide: COMPONENT_SERVICE_TOKEN, useExisting: DynamicComponentFactoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
