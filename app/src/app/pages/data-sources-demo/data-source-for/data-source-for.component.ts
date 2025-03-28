import { Component, inject } from '@angular/core';
import {DataSourceForData} from "./data-source-for.data-source";
import {AsyncPipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-data-source-for',
    imports: [
        AsyncPipe,
        MatProgressBar,
    ],
    providers: [
        DataSourceForData,
    ],
    templateUrl: './data-source-for.component.html'
})
export class DataSourceForComponent {
  dataSource = inject(DataSourceForData);

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
