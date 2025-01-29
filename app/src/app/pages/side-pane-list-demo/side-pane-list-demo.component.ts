import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import {
  CodeModalComponent,
  CodeModalData,
  DemoFileViewerComponent,
  NgxDcDemoCardComponent,
  NgxDcDemoCardModule,
  NgxDcDemoTabsDirective
} from "@devcrate/ngx-dc-demo-card";
import { NgxDcModalService, NgxDcModalServiceToken } from "@devcrate/ngx-dc-utils";
import { BasicSidePaneListComponent } from "./basic-side-pane-list/basic-side-pane-list.component";
import { InfiniteScrollSidePaneListComponent } from "./infinite-scroll-side-pane-list/infinite-scroll-side-pane-list.component";
import {
  SortableInfiniteScrollSidePaneListComponent
} from "./sortable-infinite-scroll-side-pane-list/sortable-infinite-scroll-side-pane-list.component";

@Component({
    selector: 'app-side-pane-list-demo',
    imports: [
        BasicSidePaneListComponent,
        DemoFileViewerComponent,
        NgxDcDemoCardModule,
        MatTab,
        MatTabGroup,
        NgxDcDemoCardComponent,
        NgxDcDemoTabsDirective,
        InfiniteScrollSidePaneListComponent,
        SortableInfiniteScrollSidePaneListComponent,
        MatButton
    ],
    templateUrl: './side-pane-list-demo.component.html',
    styleUrl: './side-pane-list-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class SidePaneListDemoComponent {
  private modalService = inject(NgxDcModalService);


  public async showModal() {
    const originPath = window.location.origin.includes('localhost') ? '/' : window.location.origin + window.location.pathname

    await this.modalService.showModal<CodeModalData>(CodeModalComponent, {
      data: {
        title: 'Side Pane List',
        path: `${originPath}devcrate/ngx-dc-side-pane-list/README.md`,
        previousTitles: [],
        previousPaths: [],
      },
      width: '80vw',
      height: '80vh',
    })
  }
}
