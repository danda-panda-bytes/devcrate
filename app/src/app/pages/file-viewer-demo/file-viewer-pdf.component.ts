import {Component} from '@angular/core';
import {FileViewerComponent} from "@devcrate/ngx-dc-file-viewer";

@Component({
    selector: 'app-file-viewer-pdf',
    imports: [
        FileViewerComponent,
    ],
    template: `
    <ngx-dc-file-viewer
      [fileName]="'flyer.pdf'"
      [fileUrl]="'/assets/flyer.pdf'"
      [fitToContainer]="true"
    ></ngx-dc-file-viewer>
  `
})
export class FileViewerPdfComponent {}

