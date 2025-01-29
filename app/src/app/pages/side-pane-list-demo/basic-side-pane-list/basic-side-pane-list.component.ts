import {Component, OnInit} from '@angular/core';
import {BasicSidePaneListDataSource} from "./basic-side-pane-list.data-source";
import {
  NgxDcSidePaneListModule
} from "@devcrate/ngx-dc-side-pane-list";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'basic-side-pane-list',
    templateUrl: './basic-side-pane-list.component.html',
    styleUrl: './basic-side-pane-list.component.scss',
    imports: [
        NgxDcSidePaneListModule,
        MatCardTitle,
        MatCard,
        JsonPipe
    ],
    providers: [BasicSidePaneListDataSource]
})

export class BasicSidePaneListComponent implements OnInit {
  constructor(public dataSource: BasicSidePaneListDataSource) {}

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
