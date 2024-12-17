import {NgxDcInfiniteScrollDataSource, PageableResult} from "@devcrate/ngx-dc-data-sources";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NgxDcInfiniteSidePaneListDataSource} from "@devcrate/ngx-dc-side-pane-list";

export interface MyModel {
  id: number
  name: string
}

@Injectable()
export class SortableInfiniteScrollSidePaneListDataSource extends NgxDcInfiniteSidePaneListDataSource<MyModel, MyModel, MyModel, {
  limit: number
  offset: number
  sortDir: 'asc' | 'desc'
  sortField: keyof MyModel
}> {
  public relativePath = "http://localhost:3000/api/people"
  public rowHeight: number = 80
  public pageSize = 10
  public maxTotalCount = 1000

  public isActiveItem(selectedItem: MyModel, currentItem: MyModel): boolean {
    return selectedItem.id == currentItem.id
  }

  public trackItems(item: MyModel) {
    return item.id
  }

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
