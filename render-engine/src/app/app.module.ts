import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenderModule } from '@render';
import { DynamicComponentFactoryService } from './dynamic-component-factory.service';
import { LayoutModule, COMPONENT_SERVICE_TOKEN } from '@layout';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RenderModule,
    LayoutModule
  ],
  providers: [
    {
      provide: COMPONENT_SERVICE_TOKEN,
      useExisting: DynamicComponentFactoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
