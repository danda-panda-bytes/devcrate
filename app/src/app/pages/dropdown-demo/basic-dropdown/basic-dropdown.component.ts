import { JsonPipe } from "@angular/common";
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import {NgxDcDropdownModule } from "@devcrate/ngx-dc-dropdown";
import { BasicDropdownDataSource } from "./basic-dropdown.data-source";
import { NgxDcModalService } from "@devcrate/ngx-dc-utils"

@Component({
    selector: 'basic-dropdown',
    templateUrl: './basic-dropdown.component.html',
    styleUrl: './basic-dropdown.component.scss',
    imports: [
        JsonPipe,
        NgxDcDropdownModule,
        MatSelectModule,
        FormsModule,
    ],
    providers: [BasicDropdownDataSource]
})

export class BasicDropdownComponent implements OnInit {
  dataSource = inject(BasicDropdownDataSource);
  modalService = inject(NgxDcModalService);

  public async ngOnInit() {
    await this.dataSource.initialize()
  }
}
