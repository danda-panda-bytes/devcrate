import {NgxDcApiDataSource, PageableResult} from "@devcrate/ngx-dc-data-sources";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root', deps: [HttpClient] })
export class DataSourceMatTableData extends NgxDcApiDataSource<any> {
  public relativePath = "https://jsonplaceholder.typicode.com/users"

  public trackItems(item: any) {
    return item.id
  }

  async transformDataItems(data: PageableResult<any>): Promise<PageableResult<any>> {
    return {
      results: data.results.slice(0, 10),
      count: data.count,
    }
  }

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
