import { Component, ViewEncapsulation } from '@angular/core';
import { NgxMarkdownOnLinkClick } from '@devcrate/ngx-dc-demo-card';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown';
import {NgxDcModalService} from "@devcrate/ngx-dc-utils";
import {
  CodeModalComponent,
  CodeModalData
} from "../../../../projects/devcrate/ngx-dc-demo-card/src/lib/code-modal/code-modal.component";

@Component({
  selector: 'app-navbar-demo',
  standalone: true,
  imports: [
    MarkdownModule,
    NgxMarkdownOnLinkClick,
  ],
  templateUrl: './navbar-demo.component.html',
  styleUrl: './navbar-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarDemoComponent {
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
