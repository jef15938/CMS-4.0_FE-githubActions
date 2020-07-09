import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RenderModule, WrapperModule, RENDER_COMPONENT_SERVICE_TOKEN } from '@render';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponentFactoryService } from './dynamic-component-factory.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RenderModule,
    WrapperModule,
  ],
  providers: [
    {
      provide: RENDER_COMPONENT_SERVICE_TOKEN,
      useExisting: DynamicComponentFactoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
