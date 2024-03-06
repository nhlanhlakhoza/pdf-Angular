import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Import PdfViewerModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   NgxExtendedPdfViewerModule,
   PdfViewerModule // Add PdfViewerModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
