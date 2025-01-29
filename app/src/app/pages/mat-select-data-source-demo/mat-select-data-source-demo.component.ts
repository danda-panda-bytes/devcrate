import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import {
  CodeModalComponent,
  CodeModalData,
  DemoFileViewerComponent,
  NgxDcDemoCardModule
} from "@devcrate/ngx-dc-demo-card";
import { BasicSidePaneListComponent } from "../side-pane-list-demo/basic-side-pane-list/basic-side-pane-list.component";
import { BasicSelectDataSourceComponent } from "./basic-select-data-source/basic-select-data-source.component";
import { NgxDcModalService } from '@devcrate/ngx-dc-utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-mat-select-data-source-demo',
    imports: [
        DemoFileViewerComponent,
        MatTab,
        MatTabGroup,
        NgxDcDemoCardModule,
        BasicSelectDataSourceComponent,
        MatButtonModule,
    ],
    templateUrl: './mat-select-data-source-demo.component.html',
    styleUrl: './mat-select-data-source-demo.component.scss'
})
export class MatSelectDataSourceDemoComponent {
  constructor(private modalService: NgxDcModalService) {}

  public async showModal() {
    const originPath = window.location.origin.includes('localhost') ? '/' : window.location.origin + window.location.pathname

    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'Mat Select Data Source',
        path: `${originPath}devcrate/ngx-dc-mat-select-data-source/README.md`,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
