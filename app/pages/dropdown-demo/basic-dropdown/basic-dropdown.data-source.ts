import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { PageableResult } from "@devcrate/ngx-dc-data-sources";
import { NgxDcDropdownApiDataSource, NgxDcInfiniteDropdownDataSource } from "@devcrate/ngx-dc-dropdown";

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


export interface MyModel {
  id: number
}

@Injectable()
export class InfiniteDropdownDataSource extends NgxDcInfiniteDropdownDataSource<MyModel> {
  public relativePath = "https://devcrate.onrender.com/api/people"
  public rowHeight: number = 80
  public pageSize = 10
  public maxTotalCount = 1000

  public isActiveItem(selectedItem: MyModel, currentItem: MyModel): boolean {
    return selectedItem.id == currentItem.id
  }

  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<MyModel>> {
    return super.retrieveDataItems(overrideParams);
  }

  public trackItems(item: MyModel) {
    return item.id
  }

  constructor() {
    const httpClient = inject(HttpClient);
    super(httpClient)
  }
}
