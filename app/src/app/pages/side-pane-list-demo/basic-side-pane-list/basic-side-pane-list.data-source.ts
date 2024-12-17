import {NgxDcSidePaneListApiDataSource} from "@devcrate/ngx-dc-side-pane-list";
import {PageableResult} from "@devcrate/ngx-dc-data-sources";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";

export interface BasicSidePaneListModel {
  id: number
}

@Injectable()
export class BasicSidePaneListDataSource extends NgxDcSidePaneListApiDataSource<BasicSidePaneListModel> {
  public relativePath = "https://jsonplaceholder.typicode.com/users"

  public isActiveItem(selectedItem: BasicSidePaneListModel, currentItem: BasicSidePaneListModel): boolean {
    return selectedItem.id == currentItem.id
  }

  public trackItems(item: BasicSidePaneListModel) {
    return item.id
  }

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
