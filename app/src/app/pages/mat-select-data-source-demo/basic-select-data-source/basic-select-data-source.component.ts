import { Component, OnInit, inject } from '@angular/core';
import {BasicSelectDataSourceDataSource} from "./basic-select-data-source.data-source";
import {
  NgxDcPaneContentDirective,
  NgxDcPanePageInfoDirective,
  NgxDcSidePaneItemDirective,
  NgxDcSidePaneListComponent
} from "@devcrate/ngx-dc-side-pane-list";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {JsonPipe} from "@angular/common";
import {
  NgxDcDropdownComponent,
  NgxDcDropdownHeaderDirective,
  NgxDcDropdownItemDirective,
  NgxDcDropdownLoadingDirective,
  NgxDcDropdownNoItemsDirective
} from "@devcrate/ngx-dc-dropdown";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  NgxDcMatSelectDataSourceModule
} from "@devcrate/ngx-dc-mat-select-data-source";

@Component({
    selector: 'basic-select-data-source',
    templateUrl: './basic-select-data-source.component.html',
    styleUrl: './basic-select-data-source.component.scss',
    imports: [
        JsonPipe,
        MatSelectModule,
        FormsModule,
        NgxDcMatSelectDataSourceModule,
    ],
    providers: [BasicSelectDataSourceDataSource]
})

export class BasicSelectDataSourceComponent implements OnInit {
  dataSource = inject(BasicSelectDataSourceDataSource);


  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
