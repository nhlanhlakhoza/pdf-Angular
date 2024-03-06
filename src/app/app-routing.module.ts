import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfDownloadComponent } from './pdf-download/pdf-download.component';

const routes: Routes = [
  {path :'pdf',component:PdfDownloadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
