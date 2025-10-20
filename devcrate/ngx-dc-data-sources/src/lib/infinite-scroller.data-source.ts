import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, firstValueFrom, Observable, Subscription} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {NgxDcApiDataSource} from "./api.data-source";
import {PageableResult} from "./base.data-source";

export const INFINITE_DEFAULT_MAX_TOTAL_COUNT = 1000
export const INFINITE_DEFAULT_PAGE_SIZE = 25

/**
 * If you need to get data from the server and use infinite scrolling, then use this class.
 * It can be used for `app-side-pane-list` component or a CdkVirtualFor.
 */
export abstract class NgxDcInfiniteScrollDataSource<
  GetDataItemsT = any, FinalDataItemsT = GetDataItemsT, AllowedParamsT = any
> extends NgxDcApiDataSource<GetDataItemsT, FinalDataItemsT, AllowedParamsT>
  implements DataSource<FinalDataItemsT> {
  /**
   * This is meant to be used to determine the height of each row in the list pane so infinite
   * scrolling behaves as it should
   */
  public abstract rowHeight: number

  /** The relative path to the endpoint on the server to get the list pane data from */
  public abstract relativePath: string

  /** Needed to have a set of items added so that when we get the visible data, we only replace that part of the array instead of adding and changing the scroll position */
  public maxTotalCount: number = INFINITE_DEFAULT_MAX_TOTAL_COUNT

  /** Needed for paging */
  public pageSize: number = INFINITE_DEFAULT_PAGE_SIZE

  /** The parameters to send to the server as params when making the http GET request using the {relativePath} */
  public params: Partial<AllowedParamsT> = {} as any

  /** The pages we have queried from the server */
  public fetchedPages: Set<number> = new Set<number>()

  private cachedData: FinalDataItemsT[]
  public subscription: Subscription

  /** The current page the user is on (based on the scroll position on the list pane) */
  public lastPageAccessed: number

  protected constructor(httpClient: HttpClient) {
    super(httpClient)
    this.prepareInfiniteScroller()
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

  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<GetDataItemsT>> {
    const response = await firstValueFrom(this.httpClient.get<GetDataItemsT[]>(this.relativePath, {
      params: this.getParams(overrideParams || this.params),
      observe: 'response',
    }))

    return <PageableResult<GetDataItemsT>>{
      count: this.getCount(response),
      results: this.getResults(response),
    }
  }

  /**
   * This sets up the infinite scroller with an array full of null items so that the scrolling bar
   * doesn't change in size.
   *
   * This is called in the constructor of the class.
   */
  public prepareInfiniteScroller() {
    this.cachedData = Array.from<FinalDataItemsT>({length: this.maxTotalCount});
    this.fetchedPages = new Set<number>();
    // Putting in an empty array with null values for the length will trigger the connect function to run from *cdkInfiniteScroller
    this.data$ = new BehaviorSubject<FinalDataItemsT[]>(this.cachedData);
    // Initialize filtering here after the data$ is filled so the filter is able to initialize
    this.initializeFiltering()
  }

  /**
   * Ensures that if you need to put initialize back to its original state, you can override `initialize` with this one.
   */
  public async originalInitialize() {
    return super.initialize()
  }

  public override async initialize(): Promise<void> {
    // Ignore it for infinite scroller since connect function is called
  }

  /**
   * Ensures that if you need to put refresh back to its original state, you can override `refresh` with this one.
   */
  public async originalRefresh() {
    return super.refresh()
  }

  /**
   * Infinite scrolling works a bit different from a normal data retrieval. Generally, when you want to update the data
   * you can call `refresh` and it will clear the data and get all the data again. However, with infinite scrolling is
   * based on the scroll position, so we need to clear all the data except the current page, and then get the data for
   * that current page again. This way, as you scroll, the data is fetched as needed.
   */
  public clearAllItemsExceptCurrentPage() {
    // reset all data to nulls
    if (!this.lastPageAccessed) { this.lastPageAccessed = 0 }
    const startIndex = this.lastPageAccessed * this.pageSize
    const endIndex = startIndex + this.pageSize
    this.cachedData = this.cachedData.map((item, i) => (i >= startIndex && i <= endIndex) ? item : null)
    this.fetchedPages.clear()
    // Putting in an empty array with null values for the length will trigger the connect function to run from *cdkInfiniteScroller
    this.data$.next(this.cachedData)
    this.count$.next(this.pageSize > this.actualDataLength ? this.actualDataLength : this.pageSize)
  }

  /**
   * Allows you to still call refresh in the infinite scroller, but does it in a way that is more efficient for infinite
   * scrolling.
   */
  public async refresh(): Promise<PageableResult<FinalDataItemsT>> {
    this.loading.next(true)
    this.clearAllItemsExceptCurrentPage()
    await this.fetchPage(this.lastPageAccessed)
    this.loading.next(false)
    return <PageableResult<FinalDataItemsT>>{
      results: this.data$.value,
      count: this.count$.value,
    }
  }

  /**
   * Because we implement a DataSource, and use it in `*cdkVirtualFor="let item of dao"`, we need to implement the
   * connect and disconnect functions for the Material CDK Virtual Scroll to work and initialize.
   *
   * This called when the list pane is initialized with a collectionViewer.
   * We subscribe to the collectionViewer to know what elements the user is currently viewing in the scroll list pane.
   * It gives us a range with a start and end element. This is how we determine the start and end pages to fetch.
   *
   * At this point, we fetch all the pages that are currently in view and override those specific elements in the array.
   *
   * Then we return an observable that we want displayed in the list pane.
   *
   * We chose filteredData$, because we also want filtering functionality. Otherwise, we would use data$ instead.
   * When there is no filter, filteredData$ is the same as data$.
   *
   * @param collectionViewer A way to know what elements are currently in view in the list pane
   *
   * @returns An observable of the data that is displayed in the list pane
   */
  public connect(collectionViewer: CollectionViewer): Observable<FinalDataItemsT[]> {
    this.loading.next(true)
    this.subscription = collectionViewer.viewChange.subscribe(async range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      const pagesToFetch = Array.from({ length: endPage - startPage + 1}).map((_, i) => {
        return i + startPage;
      })

      for (const page of pagesToFetch) {
        await this.fetchPage(page)
      }
      if (this.loading.value) {
        this.loading.next(false)
      }
    })
    return this.filteredData$;
  }

  /**
   * The `*cdkVirtualFor="let item of dao"` will call this when the component of the virtual for is destroyed.
   */
  public disconnect(): void {
    this.subscription.unsubscribe();
    this.loading.next(false)
  }

  /** Converts an index to the current page number */
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  /**
   * Retrieve pages data from the server.
   *
   * 1. Check to see if we already have the page
   * 2. Set the last page accessed to the current page and add it to `fetchedPages`
   * 3. Get the data from the server
   * 4. Update certain indexes of the cached data with the new server data
   * 5. Update the data$ BehaviorSubject with the new data which in turn updates the filteredData$.
   * 6. Update the count$ BehaviorSubject with the new count
   *
   * @param page Page number 0+ to fetch. 0 is the first page
   *
   * @returns The newly cached updated data
   */
  public async fetchPage(page: number) {
    if (this.fetchedPages.has(page)) { return null }
    this.lastPageAccessed = page
    const isFirstTime = !this.initialized
    this.initialized = true
    this.fetchedPages.add(page);

    const startPage = page * this.pageSize
    const pageData = await this.retrieveFinalData({
      ...this.params,
      ...this.getParams({
        offset: startPage,
        limit: this.pageSize,
        includeCount: isFirstTime,
      })
    });
    if (page > 0) {
      pageData.count = this.count$.value
    }
    if (this.cachedData.length < pageData.count) {
      this.cachedData = this.cachedData.concat(Array.from<FinalDataItemsT>({length: pageData.count - this.cachedData.length}));
    } else if (this.cachedData.length > pageData.count) {
      this.cachedData = this.cachedData.slice(0, pageData.count);
    }
    if (pageData.results.length === 0) {
      this.cachedData = this.cachedData.filter(a => !!a)
    } else {
      this.cachedData.splice(startPage, this.pageSize, ...pageData.results);
    }
    this.data$.next(this.cachedData);
    this.count$.next(pageData.count || this.cachedData.filter(a => !!a).length)
    return this.cachedData
  }
}
