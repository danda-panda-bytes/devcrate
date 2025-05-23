import { ChangeDetectorRef, Component, OnInit, ViewChildren, inject, viewChild } from '@angular/core';
import {SortedFilterInfiniteScrollSidePaneListDataSource} from "./sorted-filter-infinite-scroll-side-pane-list.data-source";
import {
  NgxDcPanePageInfoDirective,
  NgxDcPaneContentDirective,
  NgxDcSidePaneItemDirective,
  NgxDcSidePaneListComponent,
  NgxDcSidePaneListModule
} from "@devcrate/ngx-dc-side-pane-list";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {JsonPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
    selector: 'sorted-filter-infinite-scroll-side-pane-list',
    templateUrl: './sorted-filter-infinite-scroll-side-pane-list.component.html',
    styleUrl: './sorted-filter-infinite-scroll-side-pane-list.component.scss',
    imports: [
        NgxDcSidePaneListModule,
        MatCardTitle,
        MatCard,
        JsonPipe,
        MatIcon,
        MatIconButton
    ],
    providers: [SortedFilterInfiniteScrollSidePaneListDataSource]
})

export class SortedFilterInfiniteScrollSidePaneListComponent implements OnInit {
  dataSource = inject(SortedFilterInfiniteScrollSidePaneListDataSource);

  readonly table = viewChild(NgxDcSidePaneListComponent);

  public sorted = false
  public async sort() {
    this.sorted = !this.sorted
    this.table().scrollToTop()
    this.dataSource.params = {}
    this.dataSource.params.sortField = "name"
    this.dataSource.params.sortDir = this.sorted ? "desc" : "asc"
    this.dataSource.params.offset = 0
    this.dataSource.initialized = false
    await this.dataSource.refresh()
  }


  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
