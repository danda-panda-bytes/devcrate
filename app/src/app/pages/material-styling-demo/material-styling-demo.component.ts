import { Component } from '@angular/core';
import { CodeModalComponent, CodeModalData, NgxMarkdownOnLinkClick } from '@devcrate/ngx-dc-demo-card';
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-material-styling-demo',
  standalone: true,
  imports: [
    MarkdownModule,
    NgxMarkdownOnLinkClick,
  ],
  templateUrl: './material-styling-demo.component.html',
})
export class MaterialStylingDemoComponent {
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
