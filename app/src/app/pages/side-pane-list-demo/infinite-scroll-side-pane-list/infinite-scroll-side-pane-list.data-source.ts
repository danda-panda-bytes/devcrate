import {NgxDcInfiniteScrollDataSource, PageableResult} from "@devcrate/ngx-dc-data-sources";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NgxDcInfiniteSidePaneListDataSource} from "@devcrate/ngx-dc-side-pane-list";
import {BehaviorSubject} from "rxjs";

export interface MyModel {
  id: number
}

@Injectable()
export class InfiniteScrollSidePaneListDataSource extends NgxDcInfiniteSidePaneListDataSource<MyModel> {
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

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
