import { Component } from '@angular/core'
import { FileViewerComponent } from '@devcrate/ngx-dc-file-viewer'

@Component({
    selector: 'app-file-viewer-img',
    imports: [
        FileViewerComponent,
    ],
    template: `
    <ngx-dc-file-viewer
      fileName="myfile.png"
      fileUrl="/assets/images/devcrate.png"
      height="200px"
    ></ngx-dc-file-viewer>
  `
})
export class FileViewerImgComponent {}

