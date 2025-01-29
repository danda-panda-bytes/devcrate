import { Component, OnInit } from '@angular/core';
import { CodeModalData, CodeModalComponent, NgxMarkdownOnLinkClick } from '@devcrate/ngx-dc-demo-card';
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-angular-advanced-demo',
    imports: [
        MarkdownModule,
        NgxMarkdownOnLinkClick,
    ],
    templateUrl: './angular-advanced-demo.component.html'
})
export class AngularAdvancedDemoComponent {
  constructor(private modalService: NgxDcModalService) {}

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
