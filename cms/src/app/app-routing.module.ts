import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CmsModule } from '@cms-lib';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => CmsModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
