import {HttpClient} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { NgxDcDropdownApiDataSource } from "@devcrate/ngx-dc-dropdown";

export interface BasicModel {
  id: number
  name: string
}

@Injectable()
export class BasicDropdownDataSource extends NgxDcDropdownApiDataSource<BasicModel> {
  public relativePath = "https://jsonplaceholder.typicode.com/users"
  public rowHeight = 48

  public isActiveItem(selectedItem: BasicModel, currentItem: BasicModel): boolean {
    return selectedItem.id == currentItem.id
  }

  public trackItems(item: BasicModel) {
    return item.id
  }

  constructor() {
    const httpClient = inject(HttpClient);

    super(httpClient)
  }
}
