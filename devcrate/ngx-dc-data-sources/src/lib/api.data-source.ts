import {HttpClient, HttpResponse} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {NgxDcDataSource, PageableResult} from "./base.data-source";

/**
 * Extends functionality of the BaseDao, but retrieves the data from an API endpoint.
 *
 * This is the most common use case for Dao's; retrieving data from an API.
 */
export abstract class NgxDcApiDataSource<
  GetDataItemsT, FinalDataItemsT = GetDataItemsT, AllowedParamsT = any
> extends NgxDcDataSource<GetDataItemsT, FinalDataItemsT> {
  public abstract relativePath: string
  public params: Partial<AllowedParamsT> = {}
  public abstract trackItems(item: FinalDataItemsT): any

  protected constructor(protected httpClient: HttpClient) {
    super();
  }

  /**
   * This allows you to overrride the default behavior of the infinite scroller to set any params based on the
   * next page the scroll wants.
   * @param params
   */
  public getParams(params: {[key: string]: any }): {[key: string]: any } {
    return params
  }

  /**
   * This allows you to overrride the default behavior of the infinite scroller to set any params based on the
   * next page the scroll wants.
   *
   * This is called each time you initialize or call refresh in the data source (and potentially other cases).
   */
  public getCount(response: HttpResponse<GetDataItemsT[]>): number {
    const xTotalCount = response.headers.get("X-Total-Count")
    return xTotalCount === 'null' ? null : parseInt(xTotalCount || "0", 10)
  }

  /**
   * Allows you to override how you get the data for the data source, once its retrieved from the response.
   *
   * This is called each time you initialize or call refresh in the data source (and potentially other cases).
   *
   * @param response The response of the GET request made with the relativePath for this data source.
   *
   * @returns
   */
  public getResults(response: HttpResponse<GetDataItemsT[]>): GetDataItemsT[] {
    return response.body
  }

  /**
   * This is called when dao.initialize() is called to get the data (whether from the server or somewhere else).
   * This is the function that should be overridden to get the data from the server.
   * If you don't need paged data, just do something like
   * ```typescript
   *   return { count: data.length, results: data }
   * ```
   *
   * @param overrideParams Any parameters to override the set {this.params} object
   */
  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<GetDataItemsT>> {
    const response = await firstValueFrom(this.httpClient.get<GetDataItemsT[]>(this.relativePath, {
      params: this.getParams(overrideParams || this.params),
      observe: 'response',
    }))

    return <PageableResult<GetDataItemsT>>{
      count: this.getCount(response),
      results: this.getResults(response)
    }
  }
}
