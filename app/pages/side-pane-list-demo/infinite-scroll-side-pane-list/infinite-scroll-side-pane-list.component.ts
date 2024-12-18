import {Component, OnInit} from '@angular/core';
import {InfiniteScrollSidePaneListDataSource} from "./infinite-scroll-side-pane-list.data-source";
import {
  NgxDcPaneContentDirective,
  NgxDcPanePageInfoDirective,
  NgxDcSidePaneItemDirective,
  NgxDcSidePaneListComponent,
  NgxDcSidePaneListModule
} from "@devcrate/ngx-dc-side-pane-list";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'infinite-scroll-side-pane-list',
  templateUrl: './infinite-scroll-side-pane-list.component.html',
  styleUrl: './infinite-scroll-side-pane-list.component.scss',
  standalone: true,
  imports: [
    NgxDcSidePaneListModule,
    MatCardTitle,
    MatCard,
    JsonPipe
  ],
  providers: [InfiniteScrollSidePaneListDataSource]
})

export class InfiniteScrollSidePaneListComponent implements OnInit {
  constructor(public dataSource: InfiniteScrollSidePaneListDataSource) {}

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
