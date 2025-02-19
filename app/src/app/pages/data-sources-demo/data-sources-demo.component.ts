import { AsyncPipe, JsonPipe, NgTemplateOutlet } from "@angular/common";
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { CodeModalComponent, CodeModalData, NgxDcDemoCardModule } from "@devcrate/ngx-dc-demo-card";
import { NgxDcModalService } from "@devcrate/ngx-dc-utils";
import { HighlightModule } from "ngx-highlightjs";
import { DataSourceForComponent } from "./data-source-for/data-source-for.component";
import { DataSourceMatTableComponent } from "./data-source-mat-table/data-source-mat-table.component";

@Component({
    selector: 'app-data-sources-demo',
    imports: [
        HighlightModule,
        MatTabsModule,
        DataSourceForComponent,
        DataSourceMatTableComponent,
        MatIconModule,
        MatCardModule,
        NgxDcDemoCardModule,
        MatButtonModule,
    ],
    templateUrl: './data-sources-demo.component.html',
    styleUrl: './data-sources-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class DataSourcesDemoComponent {
  private modalService = inject(NgxDcModalService);

  public showCode = false;


  public async showModal() {
    const originPath = window.location.origin.includes('localhost') ? '/' : window.location.origin + window.location.pathname
    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'Data Sources',
        path: `${originPath}devcrate/ngx-dc-data-sources/README.md`,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
