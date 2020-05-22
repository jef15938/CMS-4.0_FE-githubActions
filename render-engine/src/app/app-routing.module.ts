import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RenderModule } from '@render';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => Promise.resolve(RenderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
