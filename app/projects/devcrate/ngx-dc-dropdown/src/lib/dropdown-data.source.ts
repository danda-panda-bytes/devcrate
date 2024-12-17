import {BehaviorSubject, firstValueFrom, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgxDcDataSource, PageableResult} from "@devcrate/ngx-dc-data-sources";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";

export const INFINITE_DEFAULT_MAX_TOTAL_COUNT = 1000
export const INFINITE_DEFAULT_PAGE_SIZE = 25

export abstract class NgxDcDropdownDataSource<
  GetDataItemsT = any, FinalDataItemsT = GetDataItemsT, RetrievedPaneItemT = GetDataItemsT
> extends NgxDcDataSource<GetDataItemsT, FinalDataItemsT> {
  public rowHeight: number = null
  /** The data given for the details of the selected item */
  public retrievedItem = new BehaviorSubject<RetrievedPaneItemT>(null)

  /** When a pane item is clicked, this is set to true */
  public selectedItem = new BehaviorSubject<FinalDataItemsT>(null)

  /** Needed for the for loop when iterating over the pane items */
  public abstract trackItems(item: FinalDataItemsT): any

  /**
   * Sets the item on the list pane to an active state. The item on the list pane is a mat-list-item. The `activated`
   * boolean is set to true when this function returns true.
   *
   * @param selectedItem {dao.selectedItem} The item that is currently selected in the details pane
   * @param currentItem The item that is currently being iterated over in the list pane
   */
  public abstract isActiveItem(selectedItem: FinalDataItemsT, currentItem: FinalDataItemsT): boolean

  /**
   * When true, the item on the list pane will be disabled.
   *
   * @param selectedItem The item that is currently selected in the details pane
   */
  public isItemDisabled(selectedItem: FinalDataItemsT): boolean {
    return false
  }

  /**
   * This is the server call to get the data for the details pane. This is an inner
   * call made in the `onPaneItemClicked` function.
   *
   * Override this function to get the data for the `ngxDcPaneContent` let context.
   *
   * @param item The item that was clicked on the list pane
   */
  public async retrieveItem(item: FinalDataItemsT): Promise<RetrievedPaneItemT> {
    return item as unknown as RetrievedPaneItemT
  }

  /**
   * When a list pane item is clicked, this function is called.
   * Its purpose is to retrieve the data needed for the details pane
   *
   * When you use `ngx-dc-side-pane-list`, and use the `ngxDcSidePaneItem` directive, this function is called when the
   * parent element of that content is clicked.
   *
   * The let context in the `ngxDcPaneContent` directive is the result of this function.
   *
   * ```typescript
   * <ngx-dc-side-pane-list [dao]="dao" ...>
   *   <ng-container *ngxDcSidePaneItem="let item; let index = index"></ng-container>
   *   <ng-container *ngxDcPaneContent="let currentItem"></ng-container>
   * </ngx-dc-side-pane-list>
   * ```
   *
   * This function is generally not overridden, but the `retrieveItem` function is.
   *
   * @param item The item that was clicked on the list pane
   * @param force If true, the function will not stop if the item is already selected so it can refresh items.
   *
   * @returns The data for the details pane, which is then set to the `retrievedItem` in the dao, and passed into
   *          the `ngxDcPaneContent` directive.
   */
  public async onPaneItemClicked(item: FinalDataItemsT, force = false): Promise<RetrievedPaneItemT> {
    if (this.isItemDisabled(item)) { return null }
    if (!force && this.selectedItem.value && item && this.isActiveItem(this.selectedItem.value, item)) { return null }
    this.selectedItem.next(item)
    this.itemLoading.next(true)
    const result = await this.retrieveItem(item)
    this.retrievedItem.next(result)
    this.itemLoading.next(false)
    return result
  }

  /**
   * Refreshes the item retrieved that is selected
   */
  public async refreshRetrievedItem(): Promise<RetrievedPaneItemT> {
    if (!this.selectedItem.value) return null
    return this.onPaneItemClicked(this.selectedItem.value, true)
  }

  /**
   * This is the `[ngClass]` function for the list pane items. It expects what the {NgClass} object.
   * The key is the class name and the value is a boolean saying to add the class or not.
   *
   * @param selectedItem The item that is currently selected in the details pane
   *
   * @returns {NgClass} object
   *
   * @example
   *
   * ```typescript
   * public ngClassTriggerItem(focusedItem: FinalDataItemsT, item: FinalDataItemsT, index: number) {
   *   return {
   *     'pending-bg-color': item.status === 'Pending',
   *     'odd': index % 2 === 0,
   *   }
   * }
   * ```
   */
  public ngClassTriggerItem(selectedItem: FinalDataItemsT) {
    return {}
  }

  /**
   * This is the `[ngClass]` function for the dropdown header. It expects what the {NgClass} object.
   * The key is the class name and the value is a boolean saying to add the class or not.
   *
   * @param selectedItem The item that is currently selected in the details pane
   * @param currentItem The item that is being compared
   * @param index The index of the {currentItem}
   * @returns {NgClass} object
   *
   * @example
   *
   * ```typescript
   * public ngClassDropdownItem(focusedItem: FinalDataItemsT, item: FinalDataItemsT, index: number) {
   *   return {
   *     'pending-bg-color': item.status === 'Pending',
   *     'odd': index % 2 === 0,
   *   }
   * }
   * ```
   */
  public ngClassDropdownItem(selectedItem: FinalDataItemsT, currentItem: FinalDataItemsT, index: number) {
    return {}
  }
}


export abstract class NgxDcDropdownApiDataSource<
  GetDataItemsT, FinalDataItemsT = GetDataItemsT, RetrievedPaneItemT = GetDataItemsT, AllowedParamsT = any
> extends NgxDcDropdownDataSource<GetDataItemsT, FinalDataItemsT, RetrievedPaneItemT> {
  public abstract relativePath: string
  public params: Partial<AllowedParamsT> = <AllowedParamsT>{};

  protected constructor(protected httpClient: HttpClient) {
    super();
  }

  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<GetDataItemsT>> {
    const response = await firstValueFrom(this.httpClient.get<GetDataItemsT[]>(this.relativePath, {
      params: overrideParams || this.params as any,
      observe: 'response',
    }))

    const count = response.headers.get("X-Total-Count") ? parseInt(response.headers.get("X-Total-Count"),10) : null
    return <PageableResult<GetDataItemsT>>{ count, results: response.body }
  }
}

/**
 * If you need to get data from the server and use infinite scrolling, then use this class.
 * It can be used for `ngx-dc-side-pane-list` component or a CdkVirtualFor.
 */
export abstract class NgxDcInfiniteDropdownDataSource<
  GetDataItemsT = any, FinalDataItemsT = GetDataItemsT, RetrievedPaneItemT = GetDataItemsT, AllowedParamsT = any
> extends NgxDcDropdownApiDataSource<GetDataItemsT, FinalDataItemsT, RetrievedPaneItemT>
  implements DataSource<FinalDataItemsT> {
  /**
   * This is meant to be used to determine the height of each row in the list pane so infinite
   * scrolling behaves as it should
   */
  public abstract rowHeight: number

  /** Needed to have a set of items added so that when we get the visible data, we only replace that part of the array instead of adding and changing the scroll position */
  public maxTotalCount: number = INFINITE_DEFAULT_MAX_TOTAL_COUNT

  /** Needed for paging */
  public pageSize: number = INFINITE_DEFAULT_PAGE_SIZE

  /** The relative path to the endpoint on the server to get the list pane data from */
  public abstract relativePath: string

  /** The parameters to send to the server as params when making the http GET request using the {relativePath} */
  public params: Partial<AllowedParamsT> = {} as any

  /** The pages we have queried from the server */
  private fetchedPages: Set<number> = new Set<number>()

  private cachedData: FinalDataItemsT[]
  private subscription: Subscription

  /** The current page the user is on (based on the scroll position on the list pane) */
  private lastPageAccessed: number = null

  protected constructor(httpClient: HttpClient) {
    super(httpClient)
    this.prepareInfiniteScroller()
  }

  /**
   * This is called when the list pane needs to get the data from the server.
   * This is the function that should be overridden to get the data from the server.
   * Currently, this assumes the server is return an array as a response and a header with the total count.
   * @param overrideParams Any parameters to override the set {this.params} object
   */
  public async retrieveDataItems(overrideParams: any = null): Promise<PageableResult<GetDataItemsT>> {
    const response = await firstValueFrom(this.httpClient.get<GetDataItemsT[]>(this.relativePath, {
      params: overrideParams || this.params as any,
      observe: 'response',
    }))

    const count = response.headers.get("X-Total-Count") ? parseInt(response.headers.get("X-Total-Count"),10) : null
    return <PageableResult<GetDataItemsT>>{ count, results: response.body }
  }

  /** This sets up the infinite scroller with an array full of null items so that the scrolling bar
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

  public async initialize(): Promise<void> {
    // Ignore it for infinite scroller since connect function is called
  }

  /**
   * Ensures that if you need to put refresh back to its original state, you can override `refresh` with this one.
   */
  public async originalRefresh() {
    return super.refresh()
  }

  /**
   * When you need to completely reset the dropdown as if you never used it.
   * This is useful if you have search functionality and want to reset the entire data before getting the first page
   */
  public resetInfiniteScrolling(){
    this.params = {}
    this.lastPageAccessed = null
    this.cachedData = Array.from<FinalDataItemsT>({length: this.maxTotalCount})
    this.fetchedPages = new Set<number>()
    this.data$.next(this.cachedData)
    this.count$.next(0)
    this.initialized = false
    this.loading.next(false)
  }

  /**
   * Infinite scrolling works a bit different than a normal data retrieval. Generally, when you want to update the data
   * you can call `refresh` and it will clear the data and get all the data again. However, with infinite scrolling is
   * based on the scroll position, so we need to clear all the data except the current page, and then get the data for
   * that current page again. This way, as you scroll, the data is fetched as needed.
   */
  public clearAllItemsExceptCurrentPage() {
    // reset all data to nulls
    if (!this.lastPageAccessed) { this.lastPageAccessed = 0 }
    const startIndex = 0
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
    const pagedData = await this.fetchPageData(this.lastPageAccessed)
    await this.fetchPage(this.lastPageAccessed, pagedData)
    this.loading.next(false)
    return <PageableResult<FinalDataItemsT>>{
      results: this.data$.value,
      count: this.count$.value,
    }
  }

  /**
   * Because we implement a DataSource, and use it in `*cdkVirtualFor="let item of dao`, we need to implement the
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
    this.subscription = collectionViewer.viewChange.subscribe(async range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      const pagesFetched = await Promise.all(Array.from({ length: endPage - startPage + 1}).map(async (_, i) => {
        const page = i + startPage;
        const result = await this.fetchPageData(page)
        return { result, page }
      }))

      for (const {result, page} of pagesFetched) {
        await this.fetchPage(page, result)
      }
    })
    return this.filteredData$;
  }

  /**
   * Retrieve pages data from the server.
   *
   * 1. Check to see if we already have the page
   * 2. Set the last page accessed to the current page and add it to `fetchedPages`
   * 3. Get the data from the server
   *
   * @param page The page number to retrieve
   *
   * @return The data from the server
   */
  public async fetchPageData(page: number) {
    if (this.fetchedPages.has(page)) { return null }
    this.lastPageAccessed = page
    const isFirstTime = !this.initialized
    this.initialized = true
    this.fetchedPages.add(page);

    const startPage = page * this.pageSize
    return await this.retrieveFinalData({
      ...this.params,
      offset: startPage,
      limit: this.pageSize,
      includeCount: isFirstTime,
    });
  }

  /**
   * Updates the data based on the server result
   *
   * 4. Update certain indexes of the cached data with the new server data
   * 5. Update the data$ BehaviorSubject with the new data which in turn updates the filteredData$.
   * 6. Update the count$ BehaviorSubject with the new count
   *
   * @param page Page number 0+ to fetch. 0 is the first page
   * @param serverPagedData
   *
   * @returns The newly cached updated data
   */
  public async fetchPage(page: number, serverPagedData: PageableResult<FinalDataItemsT>) {
    if (!serverPagedData) { return null }

    if (page > 0) {
      serverPagedData.count = this.count$.value
    } else {
      // Make sure the cachedData, which could have undefined items, is the correct length once we get data back for the first time
      if (this.cachedData.length < serverPagedData.count) {
        this.cachedData = this.cachedData.concat(Array.from<FinalDataItemsT>({length: serverPagedData.count - this.cachedData.length}));
      } else if (this.cachedData.length > serverPagedData.count) {
        this.cachedData = this.cachedData.slice(0, serverPagedData.count);
      }
    }

    if (serverPagedData.results.length === 0) {
      if (serverPagedData.count == null) {
        // When we receive nothing from the server and count was already received from another call, that
        // means that we have reached the end of the data, so we filter out the undefined items
        this.cachedData = this.cachedData.filter(a => !!a)
      } else {
        // When we have no results and we have a count, that means we retrieved the count on this query
        // This means this is the first retrieval and the length is 0.
        // So there is no data.
        this.cachedData = []
      }
    } else {
      // We received data back from the server
      if (serverPagedData.count == serverPagedData.results.length) {
        // If the count and data match, then there is no more data to retrieve
        this.cachedData = serverPagedData.results
      } else {
        // We received data back from the server, but it's only a paged amount
        const startPage = page * this.pageSize
        this.cachedData.splice(startPage, this.pageSize, ...serverPagedData.results)
      }
    }

    this.data$.next(this.cachedData)
    this.count$.next(serverPagedData.count || this.actualDataLength)
    return this.cachedData
  }

  /**
   * The `*cdkVirtualFor="let item of dao` will call this when the component of the virtual for is destroyed.
   */
  public disconnect(): void {
    this.subscription.unsubscribe();
  }

  /** Converts an index to the current page number */
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
}

export abstract class NgxDcDropdownArrayDataSource<
  GetDataItemsT, FinalDataItemsT = GetDataItemsT, RetrievedFocusedItemT = GetDataItemsT
> extends NgxDcDropdownDataSource<GetDataItemsT, FinalDataItemsT, RetrievedFocusedItemT> {
  protected constructor(items: FinalDataItemsT[]) {
    super()
    this.data$.next(items)
  }

  public async onPaneItemClicked(item: FinalDataItemsT): Promise<RetrievedFocusedItemT> {
    const result = item as unknown as RetrievedFocusedItemT;
    this.retrievedItem.next(result)
    return result
  }

  public async retrieveDataItems(): Promise<PageableResult<GetDataItemsT>> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
    return Promise.resolve({count: this.data$.value?.length || 0, results: this.data$.value as unknown as GetDataItemsT[]});
  }
}
