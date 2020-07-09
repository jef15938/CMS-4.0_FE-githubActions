import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RenderModule, WrapperModule } from '@render';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    ...RenderModule.forRoot().providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
