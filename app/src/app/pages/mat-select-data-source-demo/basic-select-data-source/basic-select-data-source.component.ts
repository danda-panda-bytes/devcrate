import { JsonPipe } from "@angular/common";
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import {
  NgxDcMatSelectDataSourceModule
} from "@devcrate/ngx-dc-mat-select-data-source";
import { BasicSelectDataSourceDataSource } from "./basic-select-data-source.data-source";

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
