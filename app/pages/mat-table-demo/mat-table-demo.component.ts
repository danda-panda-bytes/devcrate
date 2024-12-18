import { Component } from '@angular/core';
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { CodeModalData, NgxMarkdownOnLinkClick } from '@devcrate/ngx-dc-demo-card';
import { CodeModalComponent } from '@devcrate/ngx-dc-demo-card';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-mat-table-demo',
  standalone: true,
  imports: [
    MarkdownModule,
    NgxMarkdownOnLinkClick,
  ],
  templateUrl: './mat-table-demo.component.html',
  styleUrl: './mat-table-demo.component.scss'
})
export class MatTableDemoComponent {
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
