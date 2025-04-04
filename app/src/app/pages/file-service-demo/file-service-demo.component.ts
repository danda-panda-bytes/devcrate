import { Component, OnInit, inject } from '@angular/core';
import { NgxMarkdownOnLinkClick, CodeModalData, CodeModalComponent } from '@devcrate/ngx-dc-demo-card';
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-file-service-demo',
    imports: [
        MarkdownModule,
        NgxMarkdownOnLinkClick,
    ],
    templateUrl: './file-service-demo.component.html'
})
export class FileServiceDemoComponent {
  private modalService = inject(NgxDcModalService);


  public async showModal(hashName: string, path: string) {
    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: hashName,
        path: path,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
