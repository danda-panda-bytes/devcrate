import { Component } from '@angular/core';
import {CodeModalComponent, CodeModalData, NgxDcDemoCardModule} from "@devcrate/ngx-dc-demo-card";
import {MatTabsModule} from "@angular/material/tabs";
import {FileViewerPdfComponent} from "./file-viewer-pdf.component";
import {FileViewerImgComponent} from "./file-viewer-img.component";
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-viewer-demo',
  standalone: true,
  imports: [
    FileViewerPdfComponent,
    NgxDcDemoCardModule,
    MatTabsModule,
    FileViewerImgComponent,
    MatButtonModule,
  ],
  templateUrl: './file-viewer-demo.component.html',
  styleUrl: './file-viewer-demo.component.scss'
})
export class FileViewerDemoComponent {
  constructor(private modalService: NgxDcModalService) {}

  public async showModal() {
    const originPath = window.location.origin.includes('localhost') ? '/' : window.location.origin + window.location.pathname

    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'File Viewer',
        path: `${originPath}devcrate/ngx-dc-file-viewer/README.md`,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
