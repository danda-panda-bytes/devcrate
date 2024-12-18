import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {SortableInfiniteScrollSidePaneListDataSource} from "./sortable-infinite-scroll-side-pane-list.data-source";
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
  selector: 'sortable-infinite-scroll-side-pane-list',
  templateUrl: './sortable-infinite-scroll-side-pane-list.component.html',
  styleUrl: './sortable-infinite-scroll-side-pane-list.component.scss',
  standalone: true,
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
  @ViewChild(NgxDcSidePaneListComponent) table: NgxDcSidePaneListComponent<any>

  public sorted = false
  public async sort() {
    this.sorted = !this.sorted
    this.table.scrollToTop()
    this.dataSource.params = {}
    this.dataSource.params.sortField = "name"
    this.dataSource.params.sortDir = this.sorted ? "desc" : "asc"
    this.dataSource.params.offset = 0
    this.dataSource.initialized = false
    await this.dataSource.refresh()
  }

  constructor(public dataSource: SortableInfiniteScrollSidePaneListDataSource) {}

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
