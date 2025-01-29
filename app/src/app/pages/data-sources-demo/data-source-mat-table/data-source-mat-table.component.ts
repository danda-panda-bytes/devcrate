import { Component, inject } from '@angular/core';
import {DataSourceMatTableData} from "./data-source-mat-table.data-source";
import {AsyncPipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTable, MatTableModule} from "@angular/material/table";

@Component({
    selector: 'app-data-source-mat-table',
    imports: [
        AsyncPipe,
        MatProgressBar,
        MatTableModule,
    ],
    providers: [
        DataSourceMatTableData,
    ],
    templateUrl: './data-source-mat-table.component.html'
})
export class DataSourceMatTableComponent {
  dataSource = inject(DataSourceMatTableData);

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
