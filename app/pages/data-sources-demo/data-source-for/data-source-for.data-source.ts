import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxDcApiDataSource } from "@devcrate/ngx-dc-data-sources";

@Injectable({ providedIn: 'root', deps: [HttpClient] })
export class DataSourceForData extends NgxDcApiDataSource<any> {
  public relativePath = "https://jsonplaceholder.typicode.com/posts"

  public trackItems(item: any) {
    return item.id
  }

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
}
