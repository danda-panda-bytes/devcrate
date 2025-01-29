import { JsonPipe } from "@angular/common";
import { Component, OnInit, inject, viewChild } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import {
  NgxDcSidePaneListComponent,
  NgxDcSidePaneListModule
} from "@devcrate/ngx-dc-side-pane-list";
import { SortableInfiniteScrollSidePaneListDataSource } from "./sortable-infinite-scroll-side-pane-list.data-source";

@Component({
    selector: 'sortable-infinite-scroll-side-pane-list',
    templateUrl: './sortable-infinite-scroll-side-pane-list.component.html',
    styleUrl: './sortable-infinite-scroll-side-pane-list.component.scss',
    imports: [
        NgxDcSidePaneListModule,
        MatCardTitle,
        MatCard,
        JsonPipe,
        MatIcon,
        MatIconButton
    ],
    providers: [SortableInfiniteScrollSidePaneListDataSource]
})

export class SortableInfiniteScrollSidePaneListComponent implements OnInit {
  dataSource = inject(SortableInfiniteScrollSidePaneListDataSource)

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
